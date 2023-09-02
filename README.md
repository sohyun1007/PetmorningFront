# Petmorning 초기 프로젝트 세팅

## 폴더 구조
1) 전체 폴더 구조
![image](https://github.com/jun-hash/PetClone/assets/81207390/5e855907-3e3f-4379-a4e2-fb8ae3f1cfc5)


2) src 폴더 구조
![image](https://github.com/jun-hash/PetClone/assets/81207390/66fb4d67-e31d-4adc-9e0b-75c03d824957)


3) src>pages 폴더구조
![image](https://github.com/jun-hash/PetClone/assets/81207390/ed62e3d7-237b-49ae-b082-60187676b875)



4) 각 도메인(페이지) 폴더 구조
![image](https://github.com/jun-hash/PetClone/assets/81207390/42efdba3-cb1d-4aed-a2ce-e8a0ce6c9c57)

> ex: Letter 도메인은 하위로 CalendarList(달력 목록 페이지), View(상세 보기 페이지), Create(편지 작성 페이지)로 나뉨
> 각 페이지는 아래와 같이 구성

![image](https://github.com/jun-hash/PetClone/assets/81207390/9404836d-6d43-41d4-bad1-bab5cd23c496)


## 전역 스타일링 설정
styles 폴더 참조, 기본적으로 styled-component 사용
![image](https://github.com/jun-hash/PetClone/assets/81207390/7c8e6a6e-445d-49e0-bac2-2cf7de826c8e)

- font는 gmarket sans로 설정해놓음
![image](https://github.com/jun-hash/PetClone/assets/81207390/1652549f-8a13-4b63-952b-40cb0676a7ac)

-theme.ts에서 전역 스타일링 가능
![image](https://github.com/jun-hash/PetClone/assets/81207390/3862a16a-7cda-47c0-832b-30e22aab6759)


## 기본 컴포넌트 생성
펫모리꺼 일단 그대로 다 가져옴. Navbar나 Table Selector 같은 쓸만한 거 가져다 쓸 것
![image](https://github.com/jun-hash/PetClone/assets/81207390/59bb4672-0930-4cbd-94ea-42eb5961d9de)

## 라우터 설정
- Router.tsx 파일 참고
- 기본 라우터 잡아놓음
```javascript
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route path="/" element={<Main />} />
        <Route path="/:username" element={<Main />} />
        <Route path="/login" element={<Login />} />

        {/* SignUp */}
        <Route path="/signup" element={<SignUp />}>
          <Route path="activationFirst" element={<ActivationFirst />} />
          <Route path="activationSecond" element={<ActivationSecond />} />
          <Route path="activationThird" element={<ActivationThird />} />
        </Route>

        {/* Letter */}
        <Route path="/letter" element={<SignUp />}>
          <Route path="create" element={<Create />} />
          <Route path="calendarList" element={<CalendarList />} />
          <Route path="calendarList/:id" element={<DetailView />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Profile */}
        <Route path="/mypage" element={<MyPage />} />

        {/* Error-Handling */}
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="notFound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
```

