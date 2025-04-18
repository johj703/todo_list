# Todo List - 프론트엔드 개발 과제

Next.js, TypeScript, TanStack Query를 사용한 할 일 관리 웹 애플리케이션입니다.

## 주요 기능

- 할 일 추가, 조회, 수정, 삭제 기능(CRUD)
- 완료 상태에 따른 필터링 기능
- TanStack Query를 활용한 서버 상태 관리
- TypeScript를 사용한 타입 안정성

## 기술 스택

- **프론트엔드**: Next.js(App Router), React, TypeScript
- **상태 관리**: TanStack Query
- **스타일링**: Tailwind CSS
- **백엔드 목업**: json-server

## 설치 방법

1. Repository 클론

```bash
git clone https://github.com/johj703/todo-list.git
cd todo-list
```

2. 의존성 설치

```bash
yarn install
```

3. 개발 서버 실행

```bash
# 터미널 1: json-server 실행
yarn json-server

# 터미널 2: Next.js 개발 서버 실행
yarn dev
```

4. 브라우저에서 'http://localhost:3000' 접속

## 프로젝트 구조

```
todo-list/
├── src/
│   ├── app/
│   │   ├── page.tsx         # 메인 페이지
│   │   └── layout.tsx       # 레이아웃
│   ├── components/
│   │   ├── TodoList.tsx     # 할 일 목록 컴포넌트
│   │   ├── TodoItem.tsx     # 할 일 항목 컴포넌트
│   │   ├── TodoForm.tsx     # 할 일 입력 폼
│   │   └── TodoFilter.tsx   # 필터 컴포넌트
│   ├── api/
│   │   └── todoApi.ts       # API 함수
│   ├── types/
│   │   └── todo.ts          # 타입 정의
│   └── providers/
│       └── QueryProvider.tsx # TanStack Query 프로바이더
├── db.json                  # json-server 데이터
└── package.json
```

## 사용 방법

1. 입력 필드에 할 일을 입력하고 추가 버튼을 클릭하여 새로운 할 일을 추가합니다.
2. 체크박스를 클릭하여 할 일의 완료 상태를 토글합니다.
3. 수정 버튼을 클릭하여 할 일의 내용을 수정합니다.
4. 삭제 버튼을 클릭하여 할 일을 삭제합니다.
5. 상단의 필터 버튼(전체, 활성, 완료)을 사용하여 할 일 목록을 필터링 합니다.

## 라이센스

```
이 README는 프로젝트의 기본적인 정보, 설치 방법, 사용 방법 등을 포함하고 있습니다. 필요에 따라 스크린샷, 데모 링크, 상세한 API 문서 등을 추가할 수 있습니다. 프로젝트의 특성에 맞게 내용을 수정하시면 됩니다.
```
