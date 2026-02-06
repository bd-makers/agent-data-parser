# Bodoc Agent Parser

React Native + Web 지원하는 메시지 파서 라이브러리

## 패키지 구조

```
@bdmakers/agent-data-parser/
├── packages/
│   ├── core/                    # @bdmakers/agent-data-parser
│   │   └── src/
│   │       ├── parsers/         # 파싱 로직
│   │       ├── utils/           # 유틸리티 함수
│   │       └── types/           # 타입 정의
│   │
│   ├── renderers/               # @bdmakers/agent-data-parser-renderers
│   │   └── src/
│   │       ├── interfaces/      # 컴포넌트 인터페이스
│   │       ├── context/         # 렌더러 컨텍스트 타입
│   │       └── theme/           # 테마 토큰 인터페이스
│   │
│   ├── react-native/            # @bdmakers/agent-data-parser-react-native
│   │   └── src/
│   │       ├── components/      # RN 컴포넌트
│   │       ├── theme/           # 기본 RN 테마
│   │       └── context/         # RN 컨텍스트 팩토리
│   │
│   └── web/                     # @bdmakers/agent-data-parser-web
│       └── src/
│           ├── components/      # 웹 컴포넌트
│           ├── theme/           # 기본 웹 테마
│           └── context/         # 웹 컨텍스트 팩토리
```

## 설치

### React Native 프로젝트

```bash
npm install @bdmakers/agent-data-parser-react-native
```

### 상위 React Native 앱에서 로컬 링크로 사용하기

모노레포의 `packages/react-native`를 npm 배포 없이 링크해서 사용하려면 아래 순서를 따르세요.

#### 1. 모노레포 빌드

`bodoc-agent-parser-web` 루트에서 한 번 빌드합니다. (core, renderers는 `dist`가 필요합니다.)

```bash
cd /path/to/bodoc-agent-parser-web
npm install
npm run build
```

#### 2. React Native 앱에 로컬 경로로 의존성 추가

앱의 `package.json`에 세 패키지를 모두 **로컬 경로**로 넣습니다. (react-native 패키지가 core, renderers를 쓰므로 세 개 모두 필요합니다.)

```json
{
  "dependencies": {
    "@bdmakers/agent-data-parser": "file:../bodoc-agent-parser-web/packages/core",
    "@bdmakers/agent-data-parser-renderers": "file:../bodoc-agent-parser-web/packages/renderers",
    "@bdmakers/agent-data-parser-react-native": "file:../bodoc-agent-parser-web/packages/react-native"
  }
}
```

경로는 실제 모노레포 위치에 맞게 수정하세요. 예: `file:../../bodoc-agent-parser-web/packages/react-native`

이후 앱 디렉터리에서:

```bash
npm install
```

#### 3. Metro가 링크된 패키지를 보도록 설정

React Native 앱의 `metro.config.js`에서 링크된 모노레포 루트를 `watchFolders`에 넣고, 필요하면 `nodeModulesPaths`로 앱 루트의 `node_modules`를 우선 해석하도록 합니다.

```javascript
const path = require('path');
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..', 'bodoc-agent-parser-web'); // 실제 경로로 수정

module.exports = {
  projectRoot,
  watchFolders: [monorepoRoot],
  resolver: {
    nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],
  },
};
```

경로가 다르면 `monorepoRoot`만 실제 구조에 맞게 바꾸면 됩니다.

#### 4. 사용

이후에는 일반 설치와 동일하게 import해서 사용하면 됩니다.

```typescript
import {
  createReactNativeContext,
  detectContentType,
  parseImagePattern,
  buildImageUrl,
} from '@bdmakers/agent-data-parser-react-native';
```

**참고**

- 모노레포 쪽 코드를 수정한 뒤에는 **core** 또는 **renderers**를 건드렸다면 모노레포에서 `npm run build` (또는 `npm run build:core` / `npm run build:renderers`)를 다시 실행해야 합니다.
- **react-native** 패키지만 수정했다면 Metro가 소스를 보므로 보통 재빌드 없이 저장만으로 반영됩니다.
- `npm link` / `yarn link`보다 `file:` 의존성 + `watchFolders` 방식이 React Native(Metro)에서 더 안정적인 경우가 많습니다.

### Web 프로젝트

```bash
npm install @bdmakers/agent-data-parser-web
```

## 사용법

### React Native

```typescript
import {
  createReactNativeContext,
  detectContentType,
  parseImagePattern,
  buildImageUrl,
} from '@bdmakers/agent-data-parser-react-native';

// 컨텍스트 생성
const context = createReactNativeContext({
  imageBaseUrl: 'https://api.example.com/image/',
});

// 콘텐츠 타입 감지
const contentType = detectContentType(content); // 'html' | 'markdown' | 'text'

// 이미지 패턴 파싱
const imagePattern = parseImagePattern('[image_51_1|20x20]');
// { id: '51', seq: '1', width: 20, height: 20, type: 'image' }

// 이미지 URL 빌드
const imageUrl = buildImageUrl(context.imageBaseUrl, '51', '1');
// 'https://api.example.com/image/ai/51/image?seq=1'
```

### Web

```typescript
import {
  createWebContext,
  detectContentType,
  BDView,
  BDText,
} from '@bdmakers/agent-data-parser-web';

// 컨텍스트 생성
const context = createWebContext({
  imageBaseUrl: process.env.REACT_APP_IMG_BASE_URL || '',
});

// 컴포넌트 사용
const MyComponent = () => (
  <BDView flexDirection="row" gap={8} p={16}>
    <BDText typography={context.theme?.typography.body2_bold}>
      Hello World
    </BDText>
  </BDView>
);
```

## 개발

### 설치

```bash
npm install
```

### 빌드

```bash
# 전체 빌드
npm run build

# 개별 패키지 빌드
npm run build:core
npm run build:renderers
npm run build:react-native
npm run build:web
```

### 린트

```bash
npm run lint
npm run lint:fix
```

### 타입 체크

```bash
npm run type-check
```

### 테스트

```bash
npm run test
```

## 패키지 설명

### @bdmakers/agent-data-parser

플랫폼 무관 파싱 로직과 유틸리티 함수를 제공합니다.

**주요 기능:**
- 콘텐츠 타입 감지 (HTML, Markdown, Text)
- 이미지 패턴 파싱 및 URL 빌드
- HTML 속성 파싱
- 태그 찾기 유틸리티
- CDATA 파싱
- 마크다운 파싱

### @bdmakers/agent-data-parser-renderers

플랫폼 무관 인터페이스와 타입 정의를 제공합니다.

**주요 타입:**
- `IViewProps`, `ITextProps`, `IImageProps` - 컴포넌트 props
- `ITheme` - 테마 인터페이스
- `IRendererContext` - 렌더러 컨텍스트
- `IComponentProvider` - 컴포넌트 프로바이더

### @bdmakers/agent-data-parser-react-native

React Native 구현체를 제공합니다.

**주요 컴포넌트:**
- `BDView` - View 컴포넌트
- `BDText` - Text 컴포넌트
- `BDImage` - Image 컴포넌트
- `FilledButton`, `OutlineButton` - 버튼 컴포넌트
- `Spacer` - 스페이서 컴포넌트

### @bdmakers/agent-data-parser-web

Web (React DOM) 구현체를 제공합니다.

**주요 컴포넌트:**
- `BDView` - div 기반 컴포넌트
- `BDText` - span 기반 컴포넌트
- `BDImage` - img 기반 컴포넌트
- `FilledButton`, `OutlineButton` - button 기반 컴포넌트
- `Spacer` - 스페이서 컴포넌트

## 라이선스

MIT License - LICENSE 파일을 참고하세요.
