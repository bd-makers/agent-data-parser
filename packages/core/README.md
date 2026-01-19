# @bdmakers/agent-data-parser

플랫폼 무관 메시지 파싱 로직과 유틸리티를 제공하는 코어 패키지입니다.

## 설치

```bash
npm install @bdmakers/agent-data-parser
```

## 개요

Agent Data Parser의 코어 패키지로, React Native와 Web에서 공통으로 사용할 수 있는 파싱 로직과 유틸리티 함수를 제공합니다.

## 주요 기능

### 콘텐츠 타입 감지

메시지 콘텐츠의 타입을 자동으로 감지합니다.

```typescript
import { detectContentType } from '@bdmakers/agent-data-parser';

const contentType = detectContentType('<div>Hello</div>');
// 'html'

const markdownType = detectContentType('# Title\n\nParagraph');
// 'markdown'

const textType = detectContentType('Plain text message');
// 'text'
```

### 이미지 패턴 파싱

특수 이미지 패턴을 파싱하고 URL을 생성합니다.

```typescript
import { parseImagePattern, buildImageUrl } from '@bdmakers/agent-data-parser';

// 이미지 패턴 파싱
const pattern = parseImagePattern('[image_51_1|20x20]');
// {
//   id: '51',
//   seq: '1',
//   width: 20,
//   height: 20,
//   type: 'image'
// }

// 이미지 URL 생성
const url = buildImageUrl('https://api.example.com/image/', '51', '1');
// 'https://api.example.com/image/ai/51/image?seq=1'
```

### HTML 파싱

HTML 태그와 속성을 파싱합니다.

```typescript
import { parseHtmlAttributes, findTagEnd } from '@bdmakers/agent-data-parser';

// HTML 속성 파싱
const attrs = parseHtmlAttributes('class="btn" id="submit" disabled');
// {
//   class: 'btn',
//   id: 'submit',
//   disabled: true
// }

// 태그 종료 위치 찾기
const endIndex = findTagEnd(htmlString, startIndex, 'div');
```

### 마크다운 파싱

마크다운 패턴을 감지하고 파싱합니다.

```typescript
import { hasMarkdownPatterns, parseMarkdown } from '@bdmakers/agent-data-parser';

const hasMarkdown = hasMarkdownPatterns('# Title\n\n**Bold text**');
// true

const parsed = parseMarkdown('**bold** and *italic*');
// 파싱된 마크다운 트리
```

### CDATA 파싱

XML CDATA 섹션을 파싱합니다.

```typescript
import { parseCDATA } from '@bdmakers/agent-data-parser';

const content = parseCDATA('<![CDATA[Some content]]>');
// 'Some content'
```

## 유틸리티 함수

### 이미지 유틸리티

```typescript
import {
  parseImagePattern,
  buildImageUrl,
  isImagePattern,
} from '@bdmakers/agent-data-parser/utils';

// 이미지 패턴 확인
const isImage = isImagePattern('[image_51_1|20x20]'); // true
```

## API 문서

자세한 API 문서는 [TypeScript 타입 정의](./src/index.ts)를 참고하세요.

## 관련 패키지

- [@bdmakers/agent-data-parser-renderers](../renderers) - 공통 인터페이스
- [@bdmakers/agent-data-parser-react-native](../react-native) - React Native 구현체
- [@bdmakers/agent-data-parser-web](../web) - Web 구현체

## 라이선스

MIT
