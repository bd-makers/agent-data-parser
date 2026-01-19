# @bdmakers/agent-data-parser-renderers

플랫폼 무관 렌더러 인터페이스와 타입 정의를 제공하는 패키지입니다.

## 설치

```bash
npm install @bdmakers/agent-data-parser-renderers
```

## 개요

이 패키지는 `@bdmakers/agent-data-parser` 라이브러리의 핵심 타입과 인터페이스를 제공합니다. React Native와 Web 구현체에서 공통으로 사용하는 타입을 정의하여 플랫폼 간 일관성을 보장합니다.

## 주요 타입

### 컴포넌트 Props 인터페이스

- `IViewProps` - View 컴포넌트의 props
- `ITextProps` - Text 컴포넌트의 props
- `IImageProps` - Image 컴포넌트의 props
- `IButtonProps` - Button 컴포넌트의 props
- `ISpacerProps` - Spacer 컴포넌트의 props

### 테마 인터페이스

- `ITheme` - 테마 구조 정의
- `ITypography` - 타이포그래피 스타일
- `IColorPalette` - 색상 팔레트
- `ISpacing` - 간격 시스템

### 렌더러 컨텍스트

- `IRendererContext` - 렌더러 컨텍스트 인터페이스
- `IComponentProvider` - 컴포넌트 프로바이더 인터페이스

## 사용 예시

```typescript
import type { IViewProps, ITheme } from '@bdmakers/agent-data-parser-renderers';

// 커스텀 컴포넌트 구현
const MyView = (props: IViewProps) => {
  // 구현...
};

// 커스텀 테마 정의
const myTheme: ITheme = {
  colors: {
    primary: '#007AFF',
    // ...
  },
  typography: {
    // ...
  },
  spacing: {
    // ...
  },
};
```

## 관련 패키지

- [@bdmakers/agent-data-parser](../core) - 코어 파싱 로직
- [@bdmakers/agent-data-parser-react-native](../react-native) - React Native 구현체
- [@bdmakers/agent-data-parser-web](../web) - Web 구현체

## 라이선스

MIT
