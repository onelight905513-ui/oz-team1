# 2026-11-05 통합 수정 내역

## 통합 기준

- 작업 브랜치: `hobby-page` (`d9c544a`)
- 반영한 팀 브랜치: `master` (`66b82c1`)
- 두 브랜치의 기록을 보존하는 병합입니다. `master` 반영은 PR 검토 후 진행합니다.

## 수정 내용

- `making/index.html`: 취미 카드 7개, 상세 모달 7개와 페이지 이동 기능을 유지하고, master의 서비스 카드 3개와 후기 카드 4개 및 후기 팝업을 통합했습니다.
- HTML 안에 중복 삽입된 `DOCTYPE`, `html`, `head`, `body` 문서 틀을 제거했습니다. 서비스 내용은 유지하고 섹션 ID를 `services`로 맞춰 메뉴와 상단 버튼의 이동 대상을 복구했습니다.
- 존재하지 않는 `style.css`, `script.js` 참조를 제거했습니다. 서비스 스타일과 동작은 기존 `css/styles.css`, `js/scripts.js`에 통합된 코드를 사용하며, 나눔고딕 로딩은 문서의 head로 옮겼습니다.
- `making/css/styles.css`: 삭제된 `header-bg.png` 참조를 `header-bg.jpg`로 변경했습니다. `header-bg.jpg`는 실제 사용하는 파일이므로 master의 원본을 복원했습니다. 취소했던 PNG 추가 커밋은 복원하지 않았습니다.
- `making/js/scripts.js`: master의 후기 팝업·스크롤과 서비스 카드 등장 동작을 포함했습니다. 취미 페이지 이동 스크립트도 유지했습니다.
- 사용하지 않는 `navbar-logo.svg`는 삭제 상태를 유지했습니다. 실제 사용하는 `hobby-together-logo.png`, `s-logo.png`는 유지하고, 참조가 없는 중복 `navbar-logo.png`를 삭제했습니다.
- 교체된 About 이미지 4개, 기본 Portfolio 이미지 6개, 참조가 없는 `js/hobbies.js`를 제거했습니다. 현재 사용하는 취미·후기·팀 이미지는 유지했습니다.
- 추적되던 `.DS_Store` 4개를 제거하고 루트 `.gitignore`에 `.DS_Store` 규칙을 추가했습니다.
- 원본 보관용 `original.zip`은 유지했습니다.

## 확인 결과

- 충돌 마커 및 미해결 Git 충돌 없음
- HTML 문서 구조와 태그 짝 검사 통과
- HTML/CSS의 로컬 파일 참조 누락 없음
- 주요 메뉴 이동 대상, 취미 모달 7개, 후기 카드 4개, 서비스 카드 3개 확인
- 두 JavaScript 파일의 `node --check` 및 `git diff --check` 통과
- 브라우저에서의 실제 화면·클릭 동작 검증은 별도로 필요합니다.

## 비슷한 충돌이 다시 생기면

1. `git status`로 충돌 파일과 진행 중인 merge/revert를 확인합니다.
2. 미커밋 작업을 먼저 보관하고 최신 원격 상태를 받습니다.
3. 양쪽 변경을 비교합니다. `Accept All Current/Incoming`으로 한쪽 기능을 통째로 지우지 않습니다.
4. 이미지 삭제 전 HTML, CSS, JavaScript의 참조와 경로를 확인합니다.
5. 충돌 표시 제거 후 파일 경로, 문법, 화면 동작을 확인하고 해결한 파일만 스테이징합니다.
6. 병합 커밋을 작업 브랜치에 푸시하고 PR에서 검토합니다. 공유 브랜치에는 강제 푸시하지 않습니다.
