# @bdmakers/agent-data-parser-web

Web 애플리케이션(React DOM)을 위한 Agent Data Parser 구현체입니다.

## 설치

```bash
npm install @bdmakers/agent-data-parser-web
```

이 패키지는 다음 peer dependencies가 필요합니다:

```bash
npm install react react-dom
```

## 개요

React DOM 환경에서 메시지 파싱과 렌더링을 위한 컴포넌트와 유틸리티를 제공합니다. 코어 파싱 로직과 함께 웹 전용 컴포넌트를 포함합니다.

## 사용법

### 기본 설정

```typescript
import { createWebContext } from '@bdmakers/agent-data-parser-web';

// 렌더러 컨텍스트 생성
const context = createWebContext({
  imageBaseUrl: process.env.REACT_APP_IMG_BASE_URL || '',
  theme: customTheme, // 선택사항
});
```

### 컴포넌트 사용

#### BDView

Layout을 위한 div 기반 컴포넌트입니다.

```typescript
import { BDView } from '@bdmakers/agent-data-parser-web';

<BDView
  flex={1}
  flexDirection="row"
  gap={8}
  p={16}
  m={8}
  bg="white"
  borderRadius={8}
  className="custom-class"
>
  {/* children */}
</BDView>
```

**주요 Props:**
- `flex`, `flexDirection`, `justifyContent`, `alignItems` - Flexbox 스타일
- `gap` - 자식 요소 간 간격
- `p`, `pt`, `pb`, `pl`, `pr`, `px`, `py` - Padding
- `m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my` - Margin
- `bg` - 배경색
- `borderRadius`, `borderColor`, `borderWidth` - Border 스타일
- `className` - CSS 클래스명

#### BDText

텍스트 표시를 위한 span 기반 컴포넌트입니다.

```typescript
import { BDText } from '@bdmakers/agent-data-parser-web';

<BDText
  typography={context.theme?.typography.body1}
  color="#333333"
  className="text-content"
>
  Hello World
</BDText>
```

**주요 Props:**
- `typography` - 타이포그래피 스타일 객체
- `color` - 텍스트 색상
- `className` - CSS 클래스명

#### BDImage

이미지 표시를 위한 img 기반 컴포넌트입니다.

```typescript
import { BDImage } from '@bdmakers/agent-data-parser-web';

<BDImage
  src={imageUrl}
  alt="Description"
  width={100}
  height={100}
  borderRadius={8}
  className="thumbnail"
/>
```

#### 버튼 컴포넌트

```typescript
import { FilledButton, OutlineButton } from '@bdmakers/agent-data-parser-web';

// Filled 버튼
<FilledButton
  title="확인"
  onPress={() => console.log('Pressed')}
  color="#007AFF"
  className="submit-btn"
/>

// Outline 버튼
<OutlineButton
  title="취소"
  onPress={() => console.log('Cancelled')}
  borderColor="#007AFF"
  textColor="#007AFF"
  className="cancel-btn"
/>
```

#### Spacer

공간을 만들기 위한 컴포넌트입니다.

```typescript
import { Spacer } from '@bdmakers/agent-data-parser-web';

<Spacer size={16} />
```

### 파싱 유틸리티

```typescript
import {
  detectContentType,
  parseImagePattern,
  buildImageUrl,
} from '@bdmakers/agent-data-parser-web';

// 콘텐츠 타입 감지
const type = detectContentType(content);

// 이미지 패턴 파싱
const imageData = parseImagePattern('[image_51_1|20x20]');

// 이미지 URL 생성
const url = buildImageUrl(baseUrl, imageData.id, imageData.seq);
```

## CSS 스타일링

각 컴포넌트는 `className` prop을 지원하여 커스텀 CSS 스타일링이 가능합니다.

```css
/* styles.css */
.custom-view {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-view:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

```typescript
<BDView className="custom-view">
  {/* content */}
</BDView>
```

## 테마 커스터마이징

```typescript
import type { ITheme } from '@bdmakers/agent-data-parser-web';

const customTheme: ITheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5AC8FA',
    background: '#FFFFFF',
    text: '#000000',
    // ...
  },
  typography: {
    body1: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    // ...
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

const context = createWebContext({
  imageBaseUrl: process.env.REACT_APP_IMG_BASE_URL || '',
  theme: customTheme,
});
```

## 관련 패키지

- [@bdmakers/agent-data-parser](../core) - 코어 파싱 로직
- [@bdmakers/agent-data-parser-renderers](../renderers) - 공통 인터페이스
- [@bdmakers/agent-data-parser-react-native](../react-native) - React Native 구현체

## 라이선스

MIT
