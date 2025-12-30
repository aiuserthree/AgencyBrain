/**
 * Agency Brain - AI Knowledge Platform
 * JavaScript Application
 */

// ============================================
// DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initProposalForm();
    initEstimateForm();
    initIAForm();
    initTagInput();
    initChatWidget();
    initQuickActions();
    initAnimations();
    initSearchPage();
    initFunctionalForm();
    initVisualSearch();
    initTechStackForm();
    initWBSForm();
    initFilterButtons();
    initUploadPage();
    initDocumentsPage();
});

// ============================================
// Navigation
// ============================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = item.getAttribute('data-page');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === `page-${pageName}`) {
                    page.classList.add('active');
                }
            });
            
            // Close mobile menu
            document.querySelector('.sidebar').classList.remove('open');
        });
    });
}

// ============================================
// Mobile Menu
// ============================================

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
}

// ============================================
// Proposal Form
// ============================================

function initProposalForm() {
    const form = document.getElementById('proposalForm');
    const resultCard = document.getElementById('proposalResult');
    const industrySelect = document.getElementById('industry');
    
    // 업종별 주요 기능 데이터
    const proposalFeatures = {
        // 커머스
        fashion: ['회원가입/로그인', '소셜로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', '위시리스트', '적립금/쿠폰', '사이즈가이드', '코디추천', 'AI 스타일링', '가상피팅', '브랜드관', '세일/프로모션', '정기구독', '재입고알림', '빠른배송'],
        beauty: ['회원가입/로그인', '소셜로그인', '상품검색', '장바구니', '결제', 'AI 피부진단', '맞춤추천', '정기구독', '리뷰', '뷰티팁', '성분분석', '가상메이크업', 'AR 체험', '전문가상담', '샘플신청', '멤버십', '포인트', '이벤트'],
        fnb: ['회원가입/로그인', '상품검색', '장바구니', '결제', '정기배송', '구독', '리뷰', '레시피', '영양정보', '알레르기정보', '원산지정보', '신선도관리', '쿨배송', '선물하기', '묶음할인', '포인트', '매장찾기', '픽업예약'],
        electronics: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', 'A/S신청', '리뷰', '스펙비교', '설치예약', '렌탈', '중고거래', '보상판매', '연장보증', '사용설명서', '호환성체크', '재고확인', '매장픽업', '기업구매'],
        furniture: ['회원가입/로그인', '상품검색', '장바구니', '결제', '3D뷰어', 'AR배치', '리뷰', '인테리어상담', '설치예약', '맞춤제작', '사이즈시뮬레이션', '색상매칭', '룸스타일링', '조립서비스', '배송일정', '반품/교환', '할부', '기업고객'],
        sports: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', '커뮤니티', '운동기록', '챌린지', '멤버십', '운동루틴', '영양관리', '장비추천', '사이즈추천', '중고거래', '대여서비스', '이벤트', '포인트'],
        kids: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', '육아정보', '성장기록', '안전인증정보', '교환/반품', '연령별추천', '발달정보', '부모커뮤니티', '알레르기필터', '친환경인증', '정기배송', '선물하기', '할인쿠폰'],
        pets: ['회원가입/로그인', '상품검색', '장바구니', '결제', '정기배송', '리뷰', '반려동물등록', '건강기록', '수의사상담', '커뮤니티', '사료추천', '영양분석', '예방접종', '미용예약', '보험', '실종신고', '분양/입양', '호텔예약'],
        luxury: ['회원가입/로그인', 'VIP인증', '상품검색', '장바구니', '결제', 'VIP서비스', '정품인증', '리뷰', '컨시어지', '예약방문', '멤버십', '한정판알림', '사전예약', '프라이빗세일', '수선/관리', '감정서비스', '보험', '시크릿쇼룸'],
        lifestyle: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', '카테고리', '기획전', '정기구독', '선물하기', 'SNS공유', '인플루언서샵', '라이브커머스', 'AI추천', '포인트', '쿠폰', '이벤트', '멤버십'],
        // 서비스
        healthcare: ['회원가입/로그인', '본인인증', '진료예약', '의료진검색', '비용안내', '진료기록', '처방전', '건강검진', '원격상담', '화상진료', '병원안내', '리뷰', '의료비결제', '보험청구', '건강정보', '복약알림', '응급연락', 'AI증상체크'],
        education: ['회원가입/로그인', '강좌검색', '수강신청', '결제', '온라인강의', '실시간수업', '과제제출', '성적조회', '출석관리', '질문게시판', '수료증', '1:1튜터링', '스터디그룹', '학습진도', 'AI학습분석', '시험응시', '자료실', '커뮤니티'],
        finance: ['회원가입/로그인', '본인인증', '계좌연결', '상품조회', '신청/가입', '자산관리', '거래내역', '이체', '대출', '보험', '투자', '연금', '카드', '환전', '세금계산', '포인트', '알림', '고객센터'],
        travel: ['회원가입/로그인', '여행상품검색', '항공예약', '호텔예약', '패키지예약', '결제', '일정관리', '예약확인', '리뷰', '여행정보', '보험', '마일리지', '환율계산', '비자정보', '날씨정보', '현지투어', '렌터카', 'AI추천'],
        realestate: ['회원가입/로그인', '매물검색', '지도검색', '관심매물', '중개사상담', '방문예약', '계약관리', '시세정보', '대출상담', '입주관리', '3D투어', 'VR견학', '실거래가', '학군정보', '교통정보', '주변시설', '인테리어', '이사견적'],
        restaurant: ['회원가입/로그인', '매장검색', '메뉴검색', '예약', '웨이팅', '결제', '포인트', '리뷰', '이벤트', '매장정보', '테이크아웃', '배달주문', '단체예약', '프라이빗룸', '선결제', '구독권', '선물하기', 'AI추천'],
        fitness: ['회원가입/로그인', '수업예약', '회원권관리', 'PT예약', '운동기록', '식단관리', '커뮤니티', '락커관리', '출석체크', '이벤트', '바디체크', '운동영상', 'AI코칭', '챌린지', '포인트', '양도/일시정지', '지점선택', '실시간현황'],
        salon: ['회원가입/로그인', '스타일검색', '예약', '디자이너선택', '결제', '포인트', '리뷰', '포트폴리오', '상담', '이벤트', 'AR헤어시뮬레이션', '스타일추천', '가격표', '실시간현황', '멤버십', '선결제', '지점선택', 'SNS공유'],
        consulting: ['회원가입/로그인', '서비스검색', '상담신청', '견적요청', '프로젝트관리', '결제', '문서관리', '일정관리', '화상회의', '리뷰', '포트폴리오', '전문가매칭', '계약관리', '마일스톤', '보고서', '메시지', '평가', '정산'],
        recruitment: ['회원가입/로그인', '채용공고검색', '이력서관리', '지원하기', '면접일정', '합격결과', '기업정보', '연봉정보', '커리어상담', '알림', 'AI이력서분석', '역량테스트', '화상면접', '기업리뷰', '연봉협상', '추천채용', '인재풀', '채용일정'],
        // 미디어/콘텐츠
        media: ['회원가입/로그인', '기사검색', '카테고리', '구독', '댓글', '북마크', '공유', '알림', '맞춤뉴스', '프리미엄', 'AI요약', '팩트체크', '실시간속보', '영상뉴스', '팟캐스트', '뉴스레터', '기자구독', '커뮤니티'],
        entertainment: ['회원가입/로그인', '콘텐츠검색', '시청/청취', '결제', '구독', '좋아요', '댓글', '플레이리스트', '추천', '굿즈샵', '팬커뮤니티', '라이브방송', '오프라인이벤트', '멤버십', '투표', '기프트', '공유', '알림'],
        ott: ['회원가입/로그인', '콘텐츠검색', '시청', '구독결제', '프로필관리', '찜목록', '다운로드', '시청기록', '추천', '자녀보호', '동시접속', '화질설정', '자막설정', 'AI추천', '시리즈추적', '공유', '평가', '커뮤니티'],
        gaming: ['회원가입/로그인', '게임검색', '결제', '인앱구매', '랭킹', '업적', '친구', '길드', '채팅', '이벤트', '시즌패스', '배틀패스', '캐릭터관리', '인벤토리', '거래소', '고객지원', '신고', '리더보드'],
        community: ['회원가입/로그인', '게시글작성', '댓글', '좋아요', '팔로우', '메시지', '알림', '검색', '신고', '프로필', '채팅방', '그룹', '이벤트', '투표', '라이브', '스토리', '해시태그', '트렌딩'],
        // 공공/기관
        public: ['회원가입/로그인', '본인인증', '민원신청', '서류발급', '예약', '공지사항', '정책정보', '기관검색', '전자결재', 'FAQ', '챗봇', '알림', '국민참여', '설문조사', '통계정보', '열린데이터', '신고/제보', '불편접수'],
        nonprofit: ['회원가입/로그인', '후원하기', '정기후원', '캠페인', '봉사신청', '활동소식', '증명서발급', '회원관리', '커뮤니티', '뉴스레터', '이벤트', '크라우드펀딩', '투명성보고', '기부내역', '영수증발급', '기업후원', '물품기부', '홍보대사'],
        association: ['회원가입/로그인', '회원가입신청', '회비납부', '행사신청', '자료실', '공지사항', '회원검색', '온라인투표', '커뮤니티', '뉴스레터', '교육신청', '자격관리', '구인구직', '업계동향', '정책제안', '국제교류', '회원카드', '명부'],
        university: ['회원가입/로그인', '학사정보', '수강신청', '성적조회', '장학금', '도서관', '학생증', '증명서', '커뮤니티', '취업정보', '동아리', '시설예약', '학사일정', '강의평가', '상담예약', '기숙사', '학생식당', 'LMS'],
        // B2B
        b2b_commerce: ['회원가입/로그인', '기업인증', '상품검색', 'RFQ요청', '견적서', '주문', '결제', '재고관리', '거래처관리', '통계', '정산', '대량주문', '계약관리', '신용관리', '배송추적', 'EDI연동', '리포트', '담당자관리'],
        saas: ['회원가입/로그인', '서비스소개', '요금제', '무료체험', '결제', '대시보드', '팀관리', 'API', '고객지원', '업데이트', '워크스페이스', '권한관리', '연동설정', '사용량분석', '알림', '백업', '보안설정', '다국어'],
        manufacturing: ['회원가입/로그인', '제품카탈로그', '견적요청', '주문', '생산현황', '품질관리', '물류추적', '정산', 'B2B마켓', '파트너관리', 'MOQ설정', '샘플요청', '인증서', 'OEM/ODM', '기술문서', '수출입', '재고알림', 'SCM'],
        logistics: ['회원가입/로그인', '배송조회', '운송예약', '견적산출', '창고관리', '재고관리', '정산', 'API연동', '대시보드', '리포트', '실시간추적', '배차관리', '기사관리', '반품관리', '통관', '보험', '계약관리', 'TMS']
    };
    
    // 체크박스 컨테이너
    const featuresContainer = document.getElementById('proposalFeatures');
    const platformSelectAll = document.getElementById('platformSelectAll');
    const featureSelectAll = document.getElementById('featureSelectAll');
    
    // 업종 변경 시 주요 기능 체크박스 업데이트
    function updateProposalFeatures() {
        const selectedIndustry = industrySelect?.value;
        
        if (!featuresContainer) return;
        
        let features = proposalFeatures[selectedIndustry] || ['회원가입/로그인', '소셜로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', 'AI 챗봇'];
        
        featuresContainer.innerHTML = features.map(feature => `
            <label class="checkbox-item">
                <input type="checkbox" name="feature" value="${feature}">
                <span class="checkmark"></span>
                <span>${feature}</span>
            </label>
        `).join('');
        
        // 전체선택 체크 해제
        if (featureSelectAll) {
            featureSelectAll.checked = false;
        }
        
        // 개별 체크박스 변경 시 전체선택 상태 업데이트
        initFeatureCheckboxEvents();
    }
    
    // 기능 체크박스 이벤트 초기화
    function initFeatureCheckboxEvents() {
        const featureCheckboxes = featuresContainer?.querySelectorAll('input[name="feature"]');
        featureCheckboxes?.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateSelectAllState('feature');
            });
        });
    }
    
    // 전체선택 상태 업데이트
    function updateSelectAllState(type) {
        if (type === 'platform') {
            const platformCheckboxes = document.querySelectorAll('input[name="platform"]');
            const allChecked = Array.from(platformCheckboxes).every(cb => cb.checked);
            const someChecked = Array.from(platformCheckboxes).some(cb => cb.checked);
            if (platformSelectAll) {
                platformSelectAll.checked = allChecked;
                platformSelectAll.indeterminate = someChecked && !allChecked;
            }
        } else if (type === 'feature') {
            const featureCheckboxes = document.querySelectorAll('input[name="feature"]');
            const allChecked = Array.from(featureCheckboxes).every(cb => cb.checked);
            const someChecked = Array.from(featureCheckboxes).some(cb => cb.checked);
            if (featureSelectAll) {
                featureSelectAll.checked = allChecked;
                featureSelectAll.indeterminate = someChecked && !allChecked;
            }
        }
    }
    
    // 플랫폼 전체선택 이벤트
    platformSelectAll?.addEventListener('change', (e) => {
        const platformCheckboxes = document.querySelectorAll('input[name="platform"]');
        platformCheckboxes.forEach(cb => {
            cb.checked = e.target.checked;
        });
    });
    
    // 기능 전체선택 이벤트
    featureSelectAll?.addEventListener('change', (e) => {
        const featureCheckboxes = document.querySelectorAll('input[name="feature"]');
        featureCheckboxes.forEach(cb => {
            cb.checked = e.target.checked;
        });
    });
    
    // 플랫폼 개별 체크박스 이벤트
    const platformCheckboxes = document.querySelectorAll('input[name="platform"]');
    platformCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateSelectAllState('platform');
        });
    });
    
    // 업종 선택 변경 이벤트
    industrySelect?.addEventListener('change', updateProposalFeatures);
    
    // 초기 기능 체크박스 생성
    updateProposalFeatures();
    
    // 업종 한글명 매핑
    const industryNames = {
        fashion: '패션/의류', beauty: '뷰티/화장품', fnb: '식품/F&B', electronics: '가전/전자',
        furniture: '가구/인테리어', sports: '스포츠/아웃도어', kids: '유아/아동', pets: '반려동물',
        luxury: '명품/럭셔리', lifestyle: '라이프스타일', healthcare: '의료/헬스케어', education: '교육/이러닝',
        finance: '금융/핀테크', travel: '여행/관광', realestate: '부동산', restaurant: '음식점/카페',
        fitness: '피트니스/웰니스', salon: '뷰티샵/헤어샵', consulting: '컨설팅', recruitment: '채용/HR',
        media: '뉴스/미디어', entertainment: '엔터테인먼트', ott: 'OTT/스트리밍', gaming: '게임',
        community: '커뮤니티/SNS', public: '공공기관', nonprofit: '비영리/NGO', association: '협회/단체',
        university: '대학/교육기관', b2b_commerce: 'B2B 커머스', saas: 'SaaS/솔루션', manufacturing: '제조/유통', logistics: '물류/배송'
    };
    
    // 플랫폼 한글명 매핑
    const platformNames = {
        shopify: 'Shopify', cafe24: 'Cafe24', magento: 'Magento', woocommerce: 'WooCommerce',
        godo: '고도몰', makeshop: '메이크샵', wordpress: 'WordPress', webflow: 'Webflow',
        react: 'React/Next.js', vue: 'Vue/Nuxt.js', flutter: 'Flutter', reactnative: 'React Native',
        ios: 'iOS Native', android: 'Android Native', custom: '자체구축'
    };
    
    // 제안서 생성 함수 - 업종/기능별 동적 제안서 생성
    function generateProposal(data) {
        const { industry, industryName, target, platforms, budgetMin, budgetMax, features } = data;
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        // ============================================
        // 업종별 복잡도 계수 (1.0 ~ 1.5)
        // ============================================
        const industryComplexity = {
            fashion: 1.2, beauty: 1.1, fnb: 1.0, electronics: 1.3, furniture: 1.2, healthcare: 1.4,
            education: 1.3, finance: 1.5, travel: 1.3, realestate: 1.2, restaurant: 1.0, fitness: 1.1,
            salon: 1.0, consulting: 1.2, recruitment: 1.3, media: 1.2, streaming: 1.4, gaming: 1.5,
            sports: 1.2, charity: 1.1, association: 1.1, university: 1.3, b2b_commerce: 1.4,
            saas: 1.5, manufacturing: 1.3, logistics: 1.4, default: 1.2
        };
        const complexityRate = industryComplexity[industry] || industryComplexity.default;

        // ============================================
        // 플랫폼별 비용 (만원) - 기본 개발비
        // ============================================
        const platformCosts = {
            // 솔루션 기반
            shopify: { name: 'Shopify', design: 600, publishing: 400, dev: 800 },
            cafe24: { name: 'Cafe24', design: 500, publishing: 350, dev: 600 },
            magento: { name: 'Magento', design: 700, publishing: 500, dev: 1500 },
            woocommerce: { name: 'WooCommerce', design: 500, publishing: 400, dev: 700 },
            godo: { name: '고도몰', design: 500, publishing: 350, dev: 600 },
            makeshop: { name: '메이크샵', design: 500, publishing: 350, dev: 550 },
            wordpress: { name: 'WordPress', design: 500, publishing: 400, dev: 600 },
            webflow: { name: 'Webflow', design: 600, publishing: 300, dev: 400 },
            // 자체 개발
            react: { name: 'React/Next.js', design: 800, publishing: 600, dev: 1800 },
            vue: { name: 'Vue/Nuxt.js', design: 800, publishing: 600, dev: 1700 },
            // 앱 개발
            flutter: { name: 'Flutter', design: 700, publishing: 0, dev: 2800 },
            reactnative: { name: 'React Native', design: 700, publishing: 0, dev: 2600 },
            ios: { name: 'iOS Native', design: 600, publishing: 0, dev: 3000 },
            android: { name: 'Android Native', design: 500, publishing: 0, dev: 2500 },
            // 자체구축
            custom: { name: '자체구축', design: 900, publishing: 700, dev: 2200 },
            // 기타
            admin: { name: '관리자 페이지', design: 500, publishing: 400, dev: 1500 }
        };

        // ============================================
        // 기능별 개발 단가 (만원)
        // ============================================
        const featureCosts = {
            // 기본 기능
            '회원가입/로그인': { planning: 80, design: 120, dev: 250, desc: 'SNS 로그인, 이메일 인증 포함' },
            '소셜로그인': { planning: 40, design: 60, dev: 150, desc: '카카오/네이버/구글 연동' },
            '본인인증': { planning: 30, design: 40, dev: 200, desc: 'PASS, 문자 인증' },
            '마이페이지': { planning: 60, design: 100, dev: 200, desc: '회원정보 수정, 활동내역' },
            '프로필관리': { planning: 50, design: 80, dev: 150, desc: '프로필 사진, 소개글' },
            // 검색/목록
            '상품검색': { planning: 80, design: 100, dev: 300, desc: '필터, 정렬, 자동완성' },
            '상품목록': { planning: 60, design: 120, dev: 250, desc: '카테고리별, 무한스크롤' },
            '상품상세': { planning: 80, design: 150, dev: 300, desc: '이미지갤러리, 옵션선택' },
            '카테고리': { planning: 40, design: 60, dev: 150, desc: '대/중/소 카테고리 구조' },
            '검색': { planning: 60, design: 80, dev: 200, desc: '통합검색, 최근검색어' },
            '필터링': { planning: 50, design: 70, dev: 180, desc: '다중 필터, 정렬' },
            // 커머스 기능
            '장바구니': { planning: 60, design: 80, dev: 250, desc: '수량변경, 옵션수정' },
            '위시리스트': { planning: 40, design: 60, dev: 150, desc: '찜하기, 폴더분류' },
            '관심상품': { planning: 40, design: 60, dev: 150, desc: '좋아요, 알림설정' },
            '주문하기': { planning: 100, design: 150, dev: 400, desc: '주문서 작성, 배송지' },
            '결제': { planning: 80, design: 100, dev: 500, desc: 'PG연동, 다양한 결제수단' },
            '결제시스템': { planning: 100, design: 120, dev: 600, desc: 'PG연동, 정기결제' },
            '주문내역': { planning: 60, design: 80, dev: 200, desc: '주문상태, 상세내역' },
            '주문관리': { planning: 80, design: 100, dev: 300, desc: '주문현황, 일괄처리' },
            '배송조회': { planning: 40, design: 60, dev: 200, desc: '택배사 API 연동' },
            '배송추적': { planning: 50, design: 70, dev: 250, desc: '실시간 위치추적' },
            '반품/교환': { planning: 80, design: 100, dev: 350, desc: '신청, 진행상태' },
            '정기배송': { planning: 80, design: 100, dev: 400, desc: '구독, 배송주기 설정' },
            // 예약 기능
            '예약': { planning: 80, design: 120, dev: 350, desc: '일정선택, 옵션' },
            '예약관리': { planning: 100, design: 130, dev: 400, desc: '예약현황, 일정관리' },
            '일정관리': { planning: 60, design: 100, dev: 250, desc: '캘린더, 알림' },
            '실시간현황': { planning: 50, design: 80, dev: 200, desc: '대기인원, 잔여석' },
            // 리뷰/커뮤니티
            '리뷰': { planning: 60, design: 100, dev: 250, desc: '별점, 이미지 리뷰' },
            '리뷰/평점': { planning: 70, design: 110, dev: 280, desc: '포토리뷰, 베스트리뷰' },
            '커뮤니티': { planning: 80, design: 120, dev: 350, desc: '게시판, 댓글, 좋아요' },
            '게시판': { planning: 60, design: 80, dev: 200, desc: 'CRUD, 첨부파일' },
            '댓글': { planning: 40, design: 50, dev: 120, desc: '대댓글, 좋아요' },
            '1:1문의': { planning: 50, design: 70, dev: 180, desc: '문의등록, 답변알림' },
            '고객센터': { planning: 60, design: 90, dev: 220, desc: 'FAQ, 공지사항, 1:1문의' },
            'FAQ': { planning: 30, design: 50, dev: 100, desc: '카테고리별 FAQ' },
            '공지사항': { planning: 30, design: 50, dev: 100, desc: '공지목록, 상세' },
            // 마케팅/프로모션
            '쿠폰': { planning: 60, design: 80, dev: 300, desc: '발급, 사용, 유효기간' },
            '포인트': { planning: 60, design: 80, dev: 280, desc: '적립, 사용, 내역' },
            '이벤트': { planning: 70, design: 100, dev: 250, desc: '이벤트 페이지, 응모' },
            '프로모션': { planning: 80, design: 120, dev: 300, desc: '할인, 기획전' },
            '추천인': { planning: 50, design: 60, dev: 200, desc: '추천코드, 리워드' },
            // 알림/메시지
            '알림': { planning: 40, design: 60, dev: 200, desc: '푸시, 앱내 알림' },
            '푸시알림': { planning: 50, design: 60, dev: 250, desc: 'FCM 연동, 타겟팅' },
            '채팅': { planning: 80, design: 120, dev: 450, desc: '실시간 1:1 채팅' },
            '실시간채팅': { planning: 100, design: 140, dev: 550, desc: '그룹채팅, 파일전송' },
            '메시지': { planning: 50, design: 70, dev: 180, desc: '쪽지, 알림' },
            // AI 기능
            'AI추천': { planning: 150, design: 100, dev: 800, desc: '개인화 추천 알고리즘' },
            'AI검색': { planning: 120, design: 80, dev: 600, desc: '자연어 검색, 유사상품' },
            'AI챗봇': { planning: 150, design: 120, dev: 900, desc: 'GPT 기반 상담봇' },
            'AI분석': { planning: 180, design: 100, dev: 1000, desc: '데이터 분석, 인사이트' },
            'AI스타일링': { planning: 200, design: 150, dev: 1200, desc: '이미지 분석, 코디 추천' },
            'AI코칭': { planning: 180, design: 130, dev: 1000, desc: '맞춤형 코칭, 피드백' },
            'AR피팅': { planning: 200, design: 180, dev: 1500, desc: 'AR 가상 피팅' },
            'VR투어': { planning: 180, design: 200, dev: 1300, desc: '360도 VR 뷰어' },
            // 특수 기능
            '지도': { planning: 50, design: 80, dev: 250, desc: '카카오/네이버 지도 연동' },
            '지도검색': { planning: 70, design: 100, dev: 350, desc: '위치기반 검색, 마커' },
            '위치기반': { planning: 60, design: 80, dev: 300, desc: 'GPS, 주변검색' },
            '통계/리포트': { planning: 80, design: 120, dev: 400, desc: '차트, 데이터 시각화' },
            '대시보드': { planning: 100, design: 150, dev: 450, desc: '통계, KPI 모니터링' },
            '정산': { planning: 80, design: 100, dev: 400, desc: '매출정산, 정산내역' },
            '정산관리': { planning: 100, design: 120, dev: 500, desc: '파트너 정산, 리포트' },
            '파일업로드': { planning: 30, design: 40, dev: 150, desc: '이미지, 문서 업로드' },
            '공유하기': { planning: 30, design: 40, dev: 120, desc: 'SNS 공유, 링크복사' },
            'SNS공유': { planning: 30, design: 40, dev: 120, desc: '카카오/페이스북 공유' },
            '다국어': { planning: 60, design: 40, dev: 200, desc: 'i18n, 언어전환' },
            'API연동': { planning: 50, design: 30, dev: 300, desc: '외부 API 연동' },
            // 관리자 기능
            '회원관리': { planning: 60, design: 80, dev: 250, desc: '회원목록, 검색, 상세' },
            '상품관리': { planning: 80, design: 100, dev: 350, desc: '상품등록, 수정, 삭제' },
            '주문관리': { planning: 80, design: 100, dev: 300, desc: '주문현황, 상태변경' },
            '콘텐츠관리': { planning: 60, design: 80, dev: 250, desc: '게시물, 배너 관리' },
            '권한관리': { planning: 60, design: 70, dev: 280, desc: '역할별 권한 설정' },
            // 기본값 (정의되지 않은 기능)
            default: { planning: 50, design: 70, dev: 200, desc: '기본 기능 구현' }
        };

        // ============================================
        // 견적 계산 함수
        // ============================================
        function calculateEstimate(platforms, features, complexityRate) {
            const estimate = {
                planning: { items: [], subtotal: 0 },
                design: { items: [], subtotal: 0 },
                publishing: { items: [], subtotal: 0 },
                development: { items: [], subtotal: 0 },
                pm: { items: [], subtotal: 0 },
                total: 0
            };

            // 1. 기획 비용 계산
            let planningCost = 0;
            features.forEach(f => {
                const cost = featureCosts[f] || featureCosts.default;
                planningCost += cost.planning;
            });
            planningCost = Math.round(planningCost * complexityRate);
            estimate.planning.subtotal = planningCost;
            estimate.planning.items.push({ name: '화면설계/스토리보드', cost: Math.round(planningCost * 0.5) });
            estimate.planning.items.push({ name: 'IA/와이어프레임', cost: Math.round(planningCost * 0.3) });
            estimate.planning.items.push({ name: '요구사항정의서', cost: Math.round(planningCost * 0.2) });

            // 2. 디자인 비용 계산 (플랫폼별 + 기능별)
            let designCost = 0;
            platforms.forEach(p => {
                const pc = platformCosts[p];
                if (pc) designCost += pc.design;
            });
            features.forEach(f => {
                const cost = featureCosts[f] || featureCosts.default;
                designCost += cost.design;
            });
            designCost = Math.round(designCost * complexityRate);
            estimate.design.subtotal = designCost;
            estimate.design.items.push({ name: 'UI 디자인', cost: Math.round(designCost * 0.6) });
            estimate.design.items.push({ name: '디자인 시스템', cost: Math.round(designCost * 0.25) });
            estimate.design.items.push({ name: '프로토타입', cost: Math.round(designCost * 0.15) });

            // 3. 퍼블리싱 비용 계산 (웹 플랫폼만)
            let publishingCost = 0;
            platforms.forEach(p => {
                const pc = platformCosts[p];
                if (pc) publishingCost += pc.publishing;
            });
            publishingCost = Math.round(publishingCost * complexityRate * (features.length / 10 + 0.5));
            estimate.publishing.subtotal = publishingCost;
            estimate.publishing.items.push({ name: 'HTML/CSS 마크업', cost: Math.round(publishingCost * 0.5) });
            estimate.publishing.items.push({ name: '반응형 처리', cost: Math.round(publishingCost * 0.3) });
            estimate.publishing.items.push({ name: '인터랙션 구현', cost: Math.round(publishingCost * 0.2) });

            // 4. 개발 비용 계산 (플랫폼별 + 기능별)
            let devCost = 0;
            platforms.forEach(p => {
                const pc = platformCosts[p];
                if (pc) devCost += pc.dev;
            });
            features.forEach(f => {
                const cost = featureCosts[f] || featureCosts.default;
                devCost += cost.dev;
            });
            devCost = Math.round(devCost * complexityRate);
            
            // 프론트엔드/백엔드 분리
            const frontendCost = Math.round(devCost * 0.4);
            const backendCost = Math.round(devCost * 0.5);
            const infraCost = Math.round(devCost * 0.1);
            
            estimate.development.subtotal = devCost;
            estimate.development.items.push({ name: '프론트엔드 개발', cost: frontendCost });
            estimate.development.items.push({ name: '백엔드/API 개발', cost: backendCost });
            estimate.development.items.push({ name: '서버/인프라 구축', cost: infraCost });

            // 5. PM/QA 비용 (전체의 10%)
            const pmCost = Math.round((planningCost + designCost + publishingCost + devCost) * 0.1);
            estimate.pm.subtotal = pmCost;
            estimate.pm.items.push({ name: '프로젝트 관리', cost: Math.round(pmCost * 0.6) });
            estimate.pm.items.push({ name: 'QA/테스트', cost: Math.round(pmCost * 0.4) });

            // 총합계
            estimate.total = estimate.planning.subtotal + estimate.design.subtotal + 
                           estimate.publishing.subtotal + estimate.development.subtotal + estimate.pm.subtotal;

            return estimate;
        }

        // 견적 계산 실행
        const estimate = calculateEstimate(platforms, features, complexityRate);

        // 예상 공수 및 기간 계산
        const featureCount = features.length || 5;
        const baseMonths = Math.max(3, Math.ceil(featureCount / 4));
        const estimatedMonths = baseMonths + (platforms.length > 2 ? 1 : 0) + (estimate.total > 10000 ? 1 : 0);
        
        // MM(Man-Month) 계산 - 견적 기반
        const monthlyRate = 550; // 평균 월 단가 (만원)
        const totalMM = {
            planning: Math.round(estimate.planning.subtotal / monthlyRate * 10) / 10,
            design: Math.round(estimate.design.subtotal / monthlyRate * 10) / 10,
            publishing: Math.round(estimate.publishing.subtotal / (monthlyRate * 0.8) * 10) / 10,
            frontend: Math.round(estimate.development.subtotal * 0.4 / monthlyRate * 10) / 10,
            backend: Math.round(estimate.development.subtotal * 0.5 / monthlyRate * 10) / 10,
            pm: Math.round(estimate.pm.subtotal / monthlyRate * 10) / 10,
            total: 0
        };
        totalMM.total = Math.round((totalMM.planning + totalMM.design + totalMM.publishing + 
                                    totalMM.frontend + totalMM.backend + totalMM.pm) * 10) / 10;
        
        // 팀 구성 계산 - 견적 기반
        const teamSize = {
            pm: 1,
            uiPlanner: Math.max(1, Math.ceil(totalMM.planning / estimatedMonths)),
            artDirector: estimate.total > 8000 ? 1 : 0,
            designer: Math.max(1, Math.ceil(totalMM.design / estimatedMonths)),
            publisher: Math.max(1, Math.ceil(totalMM.publishing / estimatedMonths)),
            frontDev: Math.max(1, Math.ceil(totalMM.frontend / estimatedMonths)),
            backDev: Math.max(1, Math.ceil(totalMM.backend / estimatedMonths)),
            aiPlanner: features.some(f => f.includes('AI')) ? 1 : 0,
            aiDev: features.filter(f => f.includes('AI')).length > 0 ? Math.max(1, Math.ceil(features.filter(f => f.includes('AI')).length / 2)) : 0,
            qa: 1
        };
        
        // ============================================
        // 업종별 상세 데이터 (매우 상세하게)
        // ============================================
        const industryData = {
            fashion: {
                keyword: '스타일', value: '트렌드 선도', 
                prolog: '패션은 단순한 의류를 넘어 자기표현의 수단입니다. 급변하는 트렌드와 개인화된 스타일 요구 속에서, 고객은 "나만의 스타일"을 쉽게 찾고 완성할 수 있는 플랫폼을 원합니다.',
                marketTrends: ['글로벌 온라인 패션 시장 연 12% 성장', 'MZ세대 중심 온라인 구매 비중 70% 돌파', '지속가능 패션·리세일 시장 급성장', 'AI 스타일링·가상피팅 기술 상용화'],
                painPoints: ['사이즈 불확실성으로 인한 반품률 30% 이상', '스타일 매칭 어려움으로 구매 결정 지연', '트렌드 정보 파편화', '재고 관리 및 시즌 대응 어려움'],
                solutions: ['AI 체형 분석 기반 사이즈 추천', 'AR 가상 피팅룸', 'AI 코디 추천 시스템', '실시간 트렌드 큐레이션'],
                persona: { name: '김스타일', age: 28, job: 'IT기업 마케터', desc: '트렌드에 민감하고 SNS에서 패션 정보를 적극 탐색하는 MZ세대' },
                kpi: ['반품률 20% 감소', '전환율 25% 향상', '평균 체류시간 40% 증가', '재구매율 35% 향상'],
                competitors: ['무신사', 'W컨셉', '29CM', 'SSF샵'],
                techStack: ['AI 사이즈 추천 엔진', 'AR/VR 피팅 기술', '이미지 검색 AI', '개인화 추천 알고리즘']
            },
            beauty: {
                keyword: '아름다움', value: '맞춤형 뷰티',
                prolog: '뷰티 시장은 개인 맞춤화가 핵심입니다. 수많은 제품 중 "나에게 맞는 제품"을 찾는 것은 여전히 어려운 과제이며, AI 기술을 통한 피부 진단과 맞춤 추천이 새로운 표준이 되고 있습니다.',
                marketTrends: ['K-뷰티 글로벌 시장 점유율 확대', '클린뷰티·비건 화장품 수요 급증', '피부 진단 AI 서비스 대중화', '라이브커머스 뷰티 카테고리 1위'],
                painPoints: ['피부 타입에 맞지 않는 제품 구매', '성분 정보 이해 어려움', '색상 매칭 실패 (파운데이션, 립스틱)', '과다한 제품 수로 선택 피로도'],
                solutions: ['AI 피부 진단 시스템', '성분 분석 및 알레르기 필터', 'AR 메이크업 시뮬레이션', '뷰티 전문가 1:1 상담'],
                persona: { name: '이뷰티', age: 32, job: '회사원', desc: '피부 고민이 있고 성분에 관심이 많은 스킨케어 중심 소비자' },
                kpi: ['재구매율 40% 향상', '반품률 15% 감소', '리뷰 작성률 50% 증가', '객단가 20% 상승'],
                competitors: ['올리브영', '화해', '글로우픽', 'CJ올리브네트웍스'],
                techStack: ['피부 분석 AI', 'AR 메이크업 기술', '성분 DB 연동', '개인화 추천 엔진']
            },
            fnb: {
                keyword: '맛', value: '신선함과 편리함',
                prolog: '바쁜 현대인에게 식품은 "편리함"과 "건강" 두 가지를 모두 충족해야 합니다. 신선식품 새벽배송, 밀키트, 정기구독 등 식품 이커머스의 패러다임이 빠르게 변화하고 있습니다.',
                marketTrends: ['신선식품 온라인 시장 연 25% 성장', '새벽배송·당일배송 서비스 확대', '밀키트 시장 폭발적 성장', '건강·다이어트 식품 수요 증가'],
                painPoints: ['배송 중 신선도 저하 우려', '원산지·영양정보 확인 어려움', '맛있는 음식 선택의 어려움', '구독 관리 불편'],
                solutions: ['콜드체인 실시간 추적 시스템', '영양 성분 자동 분석', 'AI 맛 취향 분석', '유연한 정기배송 관리'],
                persona: { name: '박바쁨', age: 35, job: '맞벌이 부부', desc: '요리 시간은 없지만 건강한 식사를 원하는 직장인 가정' },
                kpi: ['정기구독 전환율 30% 향상', '배송 클레임 50% 감소', '재주문율 45% 향상', 'NPS 점수 20점 상승'],
                competitors: ['마켓컬리', '쿠팡', 'SSG닷컴', '오아시스마켓'],
                techStack: ['콜드체인 IoT', '재고 예측 AI', '레시피 추천 AI', '동적 가격 최적화']
            },
            electronics: {
                keyword: '기술', value: '스마트 라이프',
                prolog: '가전제품 구매는 높은 관여도가 요구되는 영역입니다. 복잡한 스펙 비교, 설치 서비스, A/S 등 구매 전후 여정 전체를 아우르는 통합 경험이 필요합니다.',
                marketTrends: ['가전제품 온라인 구매 비중 55% 돌파', '스마트홈 연동 가전 수요 급증', '렌탈·구독형 가전 시장 성장', 'AI 음성인식 가전 대중화'],
                painPoints: ['복잡한 스펙 비교의 어려움', '설치 및 폐가전 처리 불편', 'A/S 접수 및 처리 지연', '호환성 확인 어려움'],
                solutions: ['AI 스펙 비교 도구', '설치 예약 통합 시스템', 'A/S 실시간 접수/추적', '스마트홈 호환성 체크'],
                persona: { name: '최스마트', age: 40, job: 'IT기업 개발자', desc: '최신 기술에 관심이 많고 스마트홈 구축을 원하는 얼리어답터' },
                kpi: ['전환율 20% 향상', 'A/S 만족도 30점 상승', '재구매율 25% 향상', '스펙 비교 도구 사용률 60%'],
                competitors: ['삼성닷컴', 'LG전자', '하이마트', '전자랜드'],
                techStack: ['스펙 비교 AI', 'IoT 연동 시스템', '챗봇 A/S 접수', '호환성 체크 DB']
            },
            furniture: {
                keyword: '공간', value: '나만의 공간',
                prolog: '가구는 공간을 완성하는 핵심 요소입니다. 온라인에서 가구를 구매할 때 가장 큰 고민은 "내 공간에 어울릴까?"입니다. AR 기술과 인테리어 컨설팅이 이 간극을 메우고 있습니다.',
                marketTrends: ['온라인 가구 시장 연 18% 성장', 'AR 가구 배치 서비스 확산', '맞춤형 가구 제작 수요 증가', '친환경·지속가능 가구 선호'],
                painPoints: ['크기·색상 매칭 불확실성', '배송/설치 일정 조율 어려움', '반품/교환 어려움', '인테리어 조언 부재'],
                solutions: ['AR 가구 배치 시뮬레이션', '3D 룸 플래너', '전문 인테리어 상담', '원스톱 설치 서비스'],
                persona: { name: '정인테리어', age: 33, job: '신혼부부', desc: '첫 보금자리를 꾸미는 중으로 예산 내 최적의 인테리어를 원함' },
                kpi: ['반품률 40% 감소', 'AR 사용 후 전환율 35% 향상', '평균 주문 금액 25% 증가', '고객 만족도 40점 상승'],
                competitors: ['한샘', '이케아', '오늘의집', '리바트'],
                techStack: ['AR 배치 기술', '3D 모델링', '인테리어 AI 추천', '배송 최적화 시스템']
            },
            healthcare: {
                keyword: '건강', value: '건강한 삶',
                prolog: '의료 서비스의 디지털 전환은 필수가 되었습니다. 복잡한 예약 과정, 긴 대기 시간, 분산된 건강 기록 등 환자 경험의 개선이 시급하며, 비대면 진료와 건강관리 서비스가 새로운 표준이 되고 있습니다.',
                marketTrends: ['비대면 진료 합법화 및 확대', '디지털 헬스케어 시장 폭발적 성장', '개인 건강데이터 활용 서비스 증가', 'AI 진단 보조 도구 도입'],
                painPoints: ['예약 과정 복잡', '대기 시간 과다', '건강 기록 분산', '의료 정보 이해 어려움'],
                solutions: ['스마트 예약 시스템', '실시간 대기현황 안내', '통합 건강기록 관리', 'AI 증상 체커'],
                persona: { name: '박건강', age: 45, job: '자영업자', desc: '바쁜 일정으로 병원 방문이 어렵고 건강 관리를 디지털로 하고 싶은 중년' },
                kpi: ['예약 취소율 30% 감소', '대기시간 40% 단축', '재방문율 35% 향상', '비대면 진료 이용률 50%'],
                competitors: ['굿닥', '똑닥', '닥터나우', '강남언니'],
                techStack: ['AI 증상 분석', '화상 진료 시스템', 'FHIR 표준 연동', '예약 최적화 AI']
            },
            education: {
                keyword: '성장', value: '평생 학습',
                prolog: '학습의 패러다임이 변화하고 있습니다. 단순한 콘텐츠 제공을 넘어, 학습자 맞춤형 커리큘럼, 실시간 피드백, 학습 데이터 분석 등 개인화된 학습 경험이 핵심 경쟁력이 되고 있습니다.',
                marketTrends: ['글로벌 에듀테크 시장 연 16% 성장', 'AI 기반 적응형 학습 확산', '마이크로러닝 콘텐츠 선호', '기업 교육 온라인 전환 가속'],
                painPoints: ['학습 진도 관리 어려움', '일방향 수업으로 집중력 저하', '수준별 맞춤 학습 부재', '학습 효과 측정 어려움'],
                solutions: ['AI 학습 분석 시스템', '적응형 학습 경로', '실시간 화상 수업', '학습 성과 대시보드'],
                persona: { name: '이공부', age: 29, job: 'IT 개발자', desc: '직장 생활과 병행하며 새로운 기술 스킬을 습득하고자 하는 직장인' },
                kpi: ['수료율 40% 향상', '학습 시간 30% 증가', '재등록율 45% 향상', 'NPS 25점 상승'],
                competitors: ['클래스101', '인프런', '패스트캠퍼스', '코드잇'],
                techStack: ['적응형 학습 AI', 'LMS 시스템', '실시간 스트리밍', '학습 분석 대시보드']
            },
            finance: {
                keyword: '자산', value: '안전한 자산관리',
                prolog: '금융 서비스의 핵심은 "신뢰"입니다. 복잡한 금융 상품을 쉽게 이해하고, 나에게 맞는 상품을 찾으며, 자산 현황을 한눈에 파악할 수 있는 플랫폼이 필요합니다. AI 기반 개인화 서비스가 금융 UX의 새로운 기준이 되고 있습니다.',
                marketTrends: ['디지털 금융 서비스 이용률 85% 돌파', 'ETF·펀드 직접 투자 증가', 'AI 로보어드바이저 대중화', '오픈뱅킹·마이데이터 확산'],
                painPoints: ['금융 상품 비교 어려움', '투자 리스크 이해 부족', '분산된 자산 관리', '복잡한 가입 절차'],
                solutions: ['AI 상품 추천 시스템', '리스크 시각화 대시보드', '통합 자산관리', '간편 가입 프로세스'],
                persona: { name: '최투자', age: 38, job: '대기업 과장', desc: '여유 자금으로 투자를 시작하고 싶지만 어디서부터 시작해야 할지 모르는 직장인' },
                kpi: ['상품 가입 전환율 30% 향상', '투자 상담 요청 50% 증가', '자산 관리 앱 DAU 40% 증가', '고객 이탈률 20% 감소'],
                competitors: ['토스', '카카오뱅크', '삼성증권', 'KB증권'],
                techStack: ['AI 로보어드바이저', '마이데이터 연동', '리스크 분석 엔진', '간편인증 시스템']
            },
            travel: {
                keyword: '여행', value: '특별한 경험',
                prolog: '여행은 일상에서 벗어나 특별한 경험을 추구하는 행위입니다. 수많은 정보 속에서 나만의 완벽한 여행을 계획하는 것은 여전히 어렵고 시간이 많이 드는 일입니다. AI 기반 맞춤 추천과 원스톱 예약 서비스가 새로운 여행 패러다임을 열고 있습니다.',
                marketTrends: ['여행 예약 온라인 비중 75% 돌파', '개인 맞춤 여행 수요 증가', '로컬 경험 프로그램 인기', 'AI 여행 플래너 서비스 확산'],
                painPoints: ['여행 계획 수립 시간 과다', '정보 신뢰성 불확실', '분산된 예약 채널', '현지 정보 부족'],
                solutions: ['AI 여행 플래너', '통합 예약 시스템', '실시간 현지 정보', '맞춤형 일정 추천'],
                persona: { name: '여행러', age: 30, job: '프리랜서', desc: '새로운 경험을 추구하며 SNS 공유를 즐기는 MZ세대 여행자' },
                kpi: ['예약 전환율 35% 향상', '평균 주문 금액 20% 증가', '재예약율 40% 향상', '앱 리뷰 평점 0.5점 상승'],
                competitors: ['여기어때', '야놀자', '트립어드바이저', '클룩'],
                techStack: ['AI 일정 추천', '통합 예약 API', '실시간 가격 비교', '리뷰 분석 AI']
            },
            realestate: {
                keyword: '공간', value: '내 집 마련',
                prolog: '부동산은 인생에서 가장 큰 결정 중 하나입니다. 정보 비대칭이 심한 시장에서 신뢰할 수 있는 정보와 투명한 거래 플랫폼에 대한 요구가 높아지고 있습니다. 3D 투어, AI 시세 분석 등 프롭테크가 부동산 시장을 혁신하고 있습니다.',
                marketTrends: ['프롭테크 시장 급성장', '비대면 매물 탐색 증가', 'VR/3D 투어 서비스 확산', 'AI 시세 분석 도구 대중화'],
                painPoints: ['매물 정보 신뢰성 부족', '방문 일정 조율 어려움', '시세 정보 파악 어려움', '계약 과정 복잡성'],
                solutions: ['3D/VR 가상 투어', 'AI 시세 분석', '실시간 중개사 매칭', '전자계약 시스템'],
                persona: { name: '김청약', age: 32, job: '대기업 사원', desc: '결혼을 앞두고 내 집 마련을 계획 중인 예비 신혼부부' },
                kpi: ['매물 문의 전환율 45% 향상', '중개사 연결률 60% 향상', '거래 완료율 25% 향상', '3D 투어 이용률 70%'],
                competitors: ['직방', '다방', '네이버부동산', '호갱노노'],
                techStack: ['3D 투어 기술', 'AI 시세 분석', '전자계약 시스템', '매물 매칭 AI']
            },
            restaurant: {
                keyword: '맛집', value: '미식 경험',
                prolog: '외식 시장에서 예약과 웨이팅은 핵심 접점입니다. 고객은 긴 대기 없이 원하는 식당에서 식사하기를 원하고, 식당은 효율적인 좌석 관리와 노쇼 방지를 원합니다.',
                marketTrends: ['예약/웨이팅 앱 사용률 60% 돌파', '맛집 탐색 모바일 중심', '구독형 다이닝 서비스 등장', 'AI 메뉴 추천 서비스 확산'],
                painPoints: ['예약 불가 또는 대기 시간', '노쇼로 인한 매출 손실', '메뉴 선택 어려움', '리뷰 신뢰성 문제'],
                solutions: ['실시간 예약/웨이팅', '노쇼 방지 시스템', 'AI 메뉴 추천', '검증된 리뷰 시스템'],
                persona: { name: '미식가', age: 35, job: '마케팅 팀장', desc: '회식과 데이트를 위해 맛집을 자주 찾는 활발한 외식 소비자' },
                kpi: ['예약 전환율 40% 향상', '노쇼율 70% 감소', '재방문율 35% 향상', '평균 이용 금액 15% 증가'],
                competitors: ['캐치테이블', '네이버예약', '카카오예약', '테이블링'],
                techStack: ['실시간 좌석 관리', '노쇼 예측 AI', '메뉴 추천 엔진', '예약 최적화']
            },
            fitness: {
                keyword: '운동', value: '건강한 라이프',
                prolog: '피트니스 산업은 단순한 시설 이용을 넘어 통합 건강관리 서비스로 진화하고 있습니다. PT 예약, 운동 기록, 식단 관리까지 원스톱으로 관리할 수 있는 플랫폼에 대한 수요가 높아지고 있습니다.',
                marketTrends: ['홈트레이닝 시장 급성장', '피트니스 앱 사용률 증가', 'AI 개인 트레이너 서비스 등장', '웨어러블 연동 서비스 확산'],
                painPoints: ['PT 예약 불편', '운동 기록 관리 어려움', '동기 부여 부족', '일정 조율 어려움'],
                solutions: ['스마트 PT 예약', '운동 기록 대시보드', 'AI 코칭', '커뮤니티 기능'],
                persona: { name: '운동왕', age: 28, job: 'IT 개발자', desc: '건강 관리에 관심이 많고 꾸준한 운동을 원하는 2030 직장인' },
                kpi: ['PT 예약률 50% 향상', '회원 유지율 30% 향상', '앱 DAU 60% 증가', '추천 등록 40% 증가'],
                competitors: ['카카오헬스케어', '클래스패스', '마이다노', '눔'],
                techStack: ['AI 운동 추천', '웨어러블 연동', '영상 스트리밍', '운동 분석 AI']
            }
        };
        
        // 기본값 설정
        const defaultIndustry = {
            keyword: '혁신', value: '디지털 전환',
            prolog: '디지털 전환은 더 이상 선택이 아닌 필수입니다. 고객 경험 혁신을 통해 비즈니스 경쟁력을 확보해야 합니다.',
            marketTrends: ['디지털 전환 가속화', '모바일 퍼스트 전략 필수화', 'AI 서비스 대중화', '개인화 서비스 요구 증가'],
            painPoints: ['레거시 시스템 한계', '고객 접점 분산', '데이터 활용 미흡', 'UX 경쟁력 부족'],
            solutions: ['통합 플랫폼 구축', 'AI 기반 개인화', '데이터 분석 체계 구축', 'UX 혁신'],
            persona: { name: '이사용자', age: 35, job: '일반인', desc: '편리하고 빠른 디지털 서비스를 원하는 현대인' },
            kpi: ['전환율 25% 향상', '사용자 만족도 30점 상승', '이탈률 20% 감소', '운영 효율 40% 향상'],
            competitors: ['업계 리더 A', '업계 리더 B', '업계 리더 C'],
            techStack: ['React/Next.js', 'Spring Boot', 'PostgreSQL', 'AI/ML']
        };
        
        const ind = industryData[industry] || defaultIndustry;
        
        // ============================================
        // 선택된 기능 기반 동적 IA 구조 생성
        // ============================================
        const generateDynamicIA = () => {
            // 메인 카테고리
            const iaCategories = {
                '메인': ['AI 검색', '추천 서비스', '실시간 트렌드'],
                '상품/서비스': [],
                '마이페이지': ['계정 관리', '알림 설정'],
                '고객센터': ['FAQ', '1:1 문의', '공지사항']
            };
            
            // 선택된 기능에 따라 IA 동적 구성
            features.forEach(feature => {
                if (feature.includes('회원') || feature.includes('로그인') || feature.includes('소셜')) {
                    if (!iaCategories['마이페이지'].includes('로그인/회원가입')) {
                        iaCategories['마이페이지'].unshift('로그인/회원가입');
                    }
                }
                if (feature.includes('장바구니')) {
                    iaCategories['상품/서비스'].push('장바구니');
                }
                if (feature.includes('결제')) {
                    iaCategories['상품/서비스'].push('결제/주문');
                }
                if (feature.includes('리뷰')) {
                    iaCategories['상품/서비스'].push('리뷰/평점');
                }
                if (feature.includes('검색')) {
                    iaCategories['메인'].push('통합 검색');
                }
                if (feature.includes('배송')) {
                    iaCategories['마이페이지'].push('배송 조회');
                }
                if (feature.includes('포인트') || feature.includes('적립')) {
                    iaCategories['마이페이지'].push('포인트/혜택');
                }
                if (feature.includes('쿠폰')) {
                    iaCategories['마이페이지'].push('쿠폰함');
                }
                if (feature.includes('예약')) {
                    iaCategories['상품/서비스'].push('예약 관리');
                }
                if (feature.includes('구독')) {
                    iaCategories['마이페이지'].push('구독 관리');
                }
                if (feature.includes('위시') || feature.includes('관심')) {
                    iaCategories['마이페이지'].push('위시리스트');
                }
                if (feature.includes('AI') || feature.includes('추천')) {
                    iaCategories['메인'].push('AI 어드바이저');
                }
                if (feature.includes('커뮤니티') || feature.includes('게시판')) {
                    iaCategories['커뮤니티'] = ['자유게시판', '후기', 'Q&A'];
                }
            });
            
            // 상품/서비스 기본 메뉴
            if (iaCategories['상품/서비스'].length === 0) {
                iaCategories['상품/서비스'] = ['상품 목록', '상품 상세', '카테고리'];
            }
            
            // 중복 제거
            Object.keys(iaCategories).forEach(key => {
                iaCategories[key] = [...new Set(iaCategories[key])];
            });
            
            return Object.entries(iaCategories).map(([main, subs]) => ({ main, sub: subs }));
        };
        
        // 선택된 기능별 상세 설명 생성
        const generateFeatureDetails = () => {
            const featureInfo = {
                '회원가입/로그인': { icon: '👤', desc: '이메일, 소셜 로그인 등 다양한 인증 방식 지원', priority: '필수', complexity: '중' },
                '소셜로그인': { icon: '🔗', desc: '카카오, 네이버, 구글 등 원클릭 로그인', priority: '필수', complexity: '중' },
                '상품검색': { icon: '🔍', desc: 'AI 기반 스마트 검색, 자동완성, 필터링', priority: '필수', complexity: '상' },
                '장바구니': { icon: '🛒', desc: '실시간 동기화, 품절 알림, 예상 결제금액', priority: '필수', complexity: '중' },
                '결제': { icon: '💳', desc: '다양한 PG사 연동, 간편결제, 분할결제', priority: '필수', complexity: '상' },
                '배송조회': { icon: '🚚', desc: '실시간 배송 추적, 알림, 배송지 관리', priority: '권장', complexity: '중' },
                '리뷰': { icon: '⭐', desc: '사진/영상 리뷰, 평점, 도움이 됐어요', priority: '권장', complexity: '중' },
                '위시리스트': { icon: '❤️', desc: '관심상품 저장, 재입고 알림', priority: '권장', complexity: '하' },
                '적립금/쿠폰': { icon: '🎁', desc: '포인트 적립/사용, 쿠폰 다운로드/적용', priority: '권장', complexity: '중' },
                'AI 챗봇': { icon: '🤖', desc: '24시간 자동 응대, FAQ 기반 학습', priority: '권장', complexity: '상' },
                '정기구독': { icon: '📦', desc: '구독 관리, 배송일 변경, 일시정지', priority: '선택', complexity: '상' },
                '예약': { icon: '📅', desc: '실시간 예약, 캘린더 연동, 알림', priority: '권장', complexity: '상' },
                '커뮤니티': { icon: '👥', desc: '게시판, 댓글, 좋아요, 팔로우', priority: '선택', complexity: '중' },
                '알림': { icon: '🔔', desc: '푸시알림, 이메일, 카카오 알림톡', priority: '권장', complexity: '중' },
                '마이페이지': { icon: '📱', desc: '개인화 대시보드, 설정 관리', priority: '필수', complexity: '중' },
                'AI 추천': { icon: '🎯', desc: 'AI 기반 개인화 상품/콘텐츠 추천', priority: '권장', complexity: '상' },
                '멤버십': { icon: '👑', desc: '등급별 혜택, VIP 전용 서비스', priority: '선택', complexity: '중' }
            };
            
            return features.map((f, i) => {
                const info = featureInfo[f] || { icon: '✨', desc: '사용자 경험 향상을 위한 핵심 기능', priority: '권장', complexity: '중' };
                return { name: f, ...info, index: i + 1 };
            });
        };
        
        // 동적 IA 생성
        const dynamicIA = generateDynamicIA();
        const featureDetails = generateFeatureDetails();
        
        return `
            <!-- 표지 (Slide 1) -->
            <div class="proposal-cover-page">
                <div class="cover-badge">PROPOSAL</div>
                <h1 class="cover-title">${industryName}<br>플랫폼 구축 제안</h1>
                <div class="cover-slogan">One Platform, Smarter ${ind.keyword} Experience</div>
                <div class="cover-subtitle">${target || '고객'} 경험을 위한 통합 플랫폼 제안서</div>
                <table class="cover-info-table">
                    <tr><td>클라이언트</td><td>${industryName} 프로젝트</td></tr>
                    <tr><td>제안유형</td><td>UX/UI 및 AI를 포함한 전체 기획 및 개발</td></tr>
                    <tr><td>제출일</td><td>${year}. ${String(month).padStart(2, '0')}. ${String(day).padStart(2, '0')}</td></tr>
                </table>
                <div class="cover-company">AGENCY BRAIN</div>
                <div class="cover-copyright">Copyright © ${year} Agency Brain. All rights reserved.</div>
            </div>
            
            <!-- Prolog (Slide 2) -->
            <div class="proposal-prolog">
                <div class="prolog-title">Prolog</div>
                <div class="prolog-quote">"${ind.keyword}의 미래, 어떻게 준비할 것인가?"</div>
                <div class="prolog-content">
                    <p>${industryName} 시장은 급격한 변화의 중심에 있습니다. ${ind.marketTrends[0]}, ${ind.marketTrends[1]} 등 시장 환경이 빠르게 변화하고 있습니다.</p>
                    <p>이러한 변화 속에서 고객은 더 나은 경험, 더 빠른 서비스, 더 정확한 정보를 요구하고 있습니다. 기존의 방식으로는 이러한 기대에 부응하기 어렵습니다.</p>
                    <p><strong>지금은 '${ind.value}'를 핵심으로 하는 새로운 디지털 플랫폼으로의 전환이 필요한 시점입니다.</strong></p>
                </div>
            </div>
            
            <!-- 목차 (Slide 3) -->
            <div class="proposal-section toc-section">
                <h2>📑 문서 목차</h2>
                <div class="toc-container">
                    <div class="toc-column">
                        <div class="toc-category">ASIS</div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">01</span><span class="toc-title">프로젝트 개요</span></div>
                            <div class="toc-sub">• 제안배경 • 프로젝트 목표</div>
                        </div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">02</span><span class="toc-title">시장 트렌드</span></div>
                            <div class="toc-sub">• ${industryName} 시장 동향 • 고객 분석</div>
                        </div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">03</span><span class="toc-title">현황 분석</span></div>
                            <div class="toc-sub">• Pain Point • 경쟁사 분석</div>
                        </div>
                    </div>
                    <div class="toc-column">
                        <div class="toc-category">TOBE</div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">04</span><span class="toc-title">솔루션 전략</span></div>
                            <div class="toc-sub">• 핵심 솔루션 • 기대효과</div>
                        </div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">05</span><span class="toc-title">IA & 디자인</span></div>
                            <div class="toc-sub">• 정보구조 • 디자인 시스템</div>
                        </div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">06</span><span class="toc-title">주요 기능 상세</span></div>
                            <div class="toc-sub">• 기능 목록 (${features.length}개) • 화면 설계</div>
                        </div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">07</span><span class="toc-title">기술 및 AI</span></div>
                            <div class="toc-sub">• 기술 스택 • AI 기능</div>
                        </div>
                    </div>
                    <div class="toc-column">
                        <div class="toc-category">PLAN</div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">08</span><span class="toc-title">수행 계획</span></div>
                            <div class="toc-sub">• 추진 조직 • 수행일정</div>
                        </div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">09</span><span class="toc-title">견적 및 투자</span></div>
                            <div class="toc-sub">• 상세 비용 • ROI 분석</div>
                        </div>
                        <div class="toc-category" style="margin-top:20px">WE ARE</div>
                        <div class="toc-group">
                            <div class="toc-item"><span class="toc-num">10</span><span class="toc-title">회사 소개</span></div>
                            <div class="toc-sub">• 역량 • 수행사례</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- ASIS 구분선 -->
            <div class="proposal-divider">
                <span class="divider-label">ASIS</span>
                <div class="divider-sections">
                    <span>01 프로젝트 개요</span>
                    <span>02 시장 트렌드</span>
                    <span>03 현황 분석</span>
                </div>
            </div>
            
            <!-- 01. 프로젝트 개요 - 제안배경 (Slide 5) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">01</span>
                    <h2>프로젝트 개요</h2>
                </div>
                
                <h3>제안배경</h3>
                <div class="background-box">
                    <div class="background-title">${ind.persona.desc}의 니즈를 충족하고, ${ind.painPoints[0]}를 해결하기 위한 차세대 플랫폼이 필요합니다.</div>
                </div>
                
                <div class="background-grid">
                    <div class="background-item">
                        <div class="bg-icon">🌐</div>
                        <div class="bg-title">${industryName} 시장 변화</div>
                        <ul class="bg-list">
                            ${ind.marketTrends.slice(0, 3).map(t => `<li>${t}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="background-item">
                        <div class="bg-icon">👥</div>
                        <div class="bg-title">타겟 고객 특성</div>
                        <ul class="bg-list">
                            <li>${ind.persona.desc}</li>
                            <li>주요 연령대: ${ind.persona.age}세 전후</li>
                            <li>디지털 채널 선호도 높음</li>
                        </ul>
                    </div>
                    <div class="background-item">
                        <div class="bg-icon">📊</div>
                        <div class="bg-title">핵심 과제</div>
                        <ul class="bg-list">
                            ${ind.painPoints.slice(0, 3).map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="insight-highlight">
                    <div class="insight-label">인사이트</div>
                    <p>결론적으로, <strong>${ind.solutions[0]}</strong>와 <strong>${ind.solutions[1] || '통합 플랫폼 구축'}</strong>을 통해 ${ind.kpi[0]}를 달성하고, ${target || '고객'}에게 차별화된 ${ind.value}를 제공해야 합니다.</p>
                </div>
            </div>
            
            <!-- 01. 프로젝트 개요 - 프로젝트 목표 (Slide 6) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">01</span>
                    <h2>프로젝트 목표</h2>
                </div>
                
                <div class="objective-intro">
                    ${industryName} 플랫폼을 이용하는 ${target || '고객'}들에게 <strong>${ind.value}</strong>를 제공하고, 업계 최고 수준의 디지털 경험을 구현합니다.
                </div>
                
                <div class="objective-grid">
                    ${ind.kpi.map((kpi, i) => `
                    <div class="objective-card">
                        <div class="obj-icon">${['🎯', '📈', '⏱️', '💎'][i]}</div>
                        <div class="obj-title">${kpi}</div>
                        <div class="obj-desc">데이터 기반 측정 및 개선</div>
                    </div>
                    `).join('')}
                </div>
                
                <div class="agenda-section">
                    <h4>핵심 솔루션</h4>
                    <div class="agenda-grid">
                        ${ind.solutions.map((sol, i) => `
                        <div class="agenda-item">
                            <div class="agenda-title">${sol}</div>
                            <ul>
                                <li>${ind.painPoints[i] ? ind.painPoints[i] + ' 해결' : '사용자 경험 개선'}</li>
                            </ul>
                        </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="keywords-box">
                    <span class="keyword-tag"># ${ind.keyword}</span>
                    <span class="keyword-tag"># ${ind.value}</span>
                    <span class="keyword-tag"># 모바일 퍼스트</span>
                    <span class="keyword-tag"># AI 개인화</span>
                </div>
            </div>
            
            <!-- 02. 시장 트렌드 (Slide 7) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">02</span>
                    <h2>${industryName} 시장 트렌드</h2>
                </div>
                
                <h3>시장 동향</h3>
                <div class="trend-intro">${industryName} 시장은 디지털 전환의 가속화와 함께 빠르게 변화하고 있습니다</div>
                
                <div class="market-trend-grid">
                    ${ind.marketTrends.map((trend, i) => `
                    <div class="trend-card">
                        <div class="trend-num">${String(i + 1).padStart(2, '0')}</div>
                        <div class="trend-content">${trend}</div>
                    </div>
                    `).join('')}
                </div>
                
                <h3>페르소나 분석</h3>
                <div class="persona-card">
                    <div class="persona-avatar">👤</div>
                    <div class="persona-info">
                        <div class="persona-name">${ind.persona.name}</div>
                        <div class="persona-meta">${ind.persona.age}세 | ${ind.persona.job}</div>
                        <div class="persona-desc">${ind.persona.desc}</div>
                    </div>
                    <div class="persona-needs">
                        <div class="needs-title">주요 니즈</div>
                        <ul>
                            ${ind.painPoints.slice(0, 3).map(p => `<li>${p} 해결</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- 02. 트렌드 분석 - 국내 UIUX TREND 1 (Slide 8) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">02</span>
                    <h2>국내 ${industryName} UIUX TREND</h2>
                </div>
                
                <div class="trend-subtitle">비주얼 중심의 고객친화적 패턴으로 방문 유저의 주목을 끌고, 콘텐츠와 상품의 자연스러운 연계 구성이 특징</div>
                
                <div class="trend-comparison-grid">
                    <div class="trend-comp-card">
                        <div class="comp-header">탐색기반 고객친화 UX</div>
                        <div class="comp-features">
                            <ul>
                                <li>상품과 콘텐츠 메뉴의 복합 구성</li>
                                <li>원하는 메뉴 바로가기</li>
                                <li>메인 검색 바 강조</li>
                                <li>쉽고 친절한 고객관점 UX Writing</li>
                            </ul>
                        </div>
                    </div>
                    <div class="trend-comp-card">
                        <div class="comp-header">부드러운 신뢰감 제고 UI</div>
                        <div class="comp-features">
                            <ul>
                                <li>브랜드 메인 컬러 + 파스텔톤 믹스</li>
                                <li>모바일 고려한 라운드형 카드배너</li>
                                <li>3D 아이콘 활용 직관적 비주얼</li>
                                <li>캐주얼하고 친근한 톤앤매너</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 02. 트렌드 분석 - 국내 UIUX TREND 2 (Slide 9) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">02</span>
                    <h2>국내 ${industryName} UIUX TREND</h2>
                </div>
                
                <div class="trend-subtitle">다양한 유입채널과 고객군에 대응하기 위한 단순 메뉴구성, 행동 중심 설계와 브랜드 메시지 전달에 주력</div>
                
                <div class="trend-comparison-grid">
                    <div class="trend-comp-card">
                        <div class="comp-header">행동기반 UX</div>
                        <div class="comp-features">
                            <ul>
                                <li>방문 목적별 메뉴 단순화 (처음이세요? / 자주 가는 메뉴)</li>
                                <li>메뉴 중심 빠른 이동 지원</li>
                                <li>직관적이고 안내/제안형 UX Writing</li>
                                <li>"지금 바로 상담하기", "쉽게 알려드릴게요" 등</li>
                            </ul>
                        </div>
                    </div>
                    <div class="trend-comp-card">
                        <div class="comp-header">브랜드 강조 UI</div>
                        <div class="comp-features">
                            <ul>
                                <li>브랜드 메인컬러 포인트</li>
                                <li>모던하고 미니멀한 UI</li>
                                <li>회사 소개 및 뉴스 콘텐츠 강조</li>
                                <li>신뢰도/안정성 제고 콘텐츠</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 02. 트렌드 분석 - 글로벌 UIUX TREND (Slide 10) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">02</span>
                    <h2>글로벌 ${industryName} UIUX TREND</h2>
                </div>
                
                <div class="trend-subtitle">정보의 밀도보다 고급스럽고 간결한 시각, 정교하고 디테일한 타겟 유저별 플로우 설계가 특징</div>
                
                <div class="trend-comparison-grid">
                    <div class="trend-comp-card">
                        <div class="comp-header">방문 타겟별 브랜딩 UX</div>
                        <div class="comp-features">
                            <ul>
                                <li>방문 타겟별 메인 랜딩 상이 (개인/기관/일반)</li>
                                <li>다양한 사용자 그룹 고려한 지역과 언어 지원</li>
                                <li>브랜드 메시지 메인 포지셔닝 노출</li>
                                <li>정보신뢰성 콘텐츠 강화 (리서치, 인사이트)</li>
                            </ul>
                        </div>
                    </div>
                    <div class="trend-comp-card">
                        <div class="comp-header">시각적 노이즈 최소화 UI</div>
                        <div class="comp-features">
                            <ul>
                                <li>브랜드 메인컬러 활용한 비주얼 브랜딩</li>
                                <li>일관된 컬러와 레이아웃 배치</li>
                                <li>아이콘/일러스트보다 기업 이미지 중심</li>
                                <li>전문성 강조한 비주얼 톤앤매너</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 02. 트렌드 분석 - 시사점 (Slide 11) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">02</span>
                    <h2>UIUX 트렌드 시사점</h2>
                </div>
                
                <div class="insight-main-box">
                    <h3>국내외 주요 ${industryName} 웹사이트 UIUX는</h3>
                </div>
                
                <div class="insight-cards-grid">
                    <div class="insight-card">
                        <div class="insight-icon">👁️</div>
                        <div class="insight-title">보여주는 신뢰에서 경험하게 하는 신뢰로</div>
                        <div class="insight-desc">단순히 데이터를 증명하거나 보여주는 것에서 고객이 '왜 선택해야 하는가'를 경험하도록 설계</div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon">💬</div>
                        <div class="insight-title">설명이 아닌 대화 (자연어 중심)</div>
                        <div class="insight-desc">일방향적 정보 전달에서 전문성과 친근함의 균형을 잡는 커뮤니케이션으로 변화</div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon">🎯</div>
                        <div class="insight-title">행동을 유도하는 콘텐츠와 정보 배치</div>
                        <div class="insight-desc">다양한 방문 목적과 타겟에 대응하여 고객의 눈길을 끄는 상품과 콘텐츠 제공</div>
                    </div>
                    <div class="insight-card">
                        <div class="insight-icon">📱</div>
                        <div class="insight-title">모든 디바이스에서 동일한 경험 품질</div>
                        <div class="insight-desc">기기와 유입채널이 달라도 동일한 정보와 경험 품질을 유지하는 반응형 기반</div>
                    </div>
                </div>
                
                <div class="insight-conclusion">
                    <p><strong>정보 중심의 웹사이트가 아닌, 신뢰 경험 중심의 커뮤니케이션 플랫폼 지향</strong></p>
                </div>
            </div>
            
            <!-- 03. 현황 분석 - Pain Point (Slide 12) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">03</span>
                    <h2>현황 분석</h2>
                </div>
                
                <h3>Pain Point 분석</h3>
                <div class="pain-point-grid">
                    ${ind.painPoints.map((pain, i) => `
                    <div class="pain-card">
                        <div class="pain-icon">😰</div>
                        <div class="pain-title">${pain}</div>
                        <div class="pain-solution">
                            <span class="solution-arrow">→</span>
                            <span class="solution-text">${ind.solutions[i] || 'UX 개선으로 해결'}</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
                
                <h3>경쟁사 분석</h3>
                <div class="competitor-grid">
                    ${ind.competitors.map((comp, i) => `
                    <div class="competitor-card">
                        <div class="comp-rank">${i + 1}</div>
                        <div class="comp-name">${comp}</div>
                        <div class="comp-status">${i === 0 ? '시장 선도' : i === 1 ? '빠른 성장' : '경쟁 심화'}</div>
                    </div>
                    `).join('')}
                </div>
                
                <div class="insight-box">
                    <h4>💡 차별화 포인트</h4>
                    <p>경쟁사 대비 <strong>${ind.solutions[0]}</strong>을 통한 차별화된 사용자 경험 제공이 핵심입니다.</p>
                </div>
            </div>
            
            <!-- 03. 현황 분석 - UXUI 관점 (Slide 13) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">03</span>
                    <h2>기존 사이트 UXUI 분석</h2>
                </div>
                
                <div class="analysis-subtitle">사이트 정보구조와 메뉴 및 네비게이션</div>
                
                <div class="asis-issues-grid">
                    <div class="asis-issue-card">
                        <div class="issue-num">1</div>
                        <div class="issue-content">
                            <div class="issue-title">브랜드 콘셉트 파악이 힘들고 통일성 낮은 UI</div>
                            <div class="issue-desc">배너 애니메이션, 컬러, 폰트 등 UI 부분의 통일성이 떨어지고 분산된 정보 전달 구조</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">2</div>
                        <div class="issue-content">
                            <div class="issue-title">사용자가 정보를 파악하기 어려운 구조</div>
                            <div class="issue-desc">메인 첫 화면에서 제공하는 카테고리 연결 버튼, 바로가기 버튼, 배너 등 요소가 너무 많음</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">3</div>
                        <div class="issue-content">
                            <div class="issue-title">여러 메뉴가 다양한 형식으로 분산되어 있음</div>
                            <div class="issue-desc">메뉴 구조가 분산되어 홈페이지 구조를 한 눈에 파악하기 어려움</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">4</div>
                        <div class="issue-content">
                            <div class="issue-title">일부 메뉴가 GNB에 없어 IA 재정비 필요</div>
                            <div class="issue-desc">메뉴 페이지에서만 접근 가능하며, 콘텐츠 해상도가 기존 페이지와 상이</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 03. 현황 분석 - 콘텐츠/디자인 관점 (Slide 14) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">03</span>
                    <h2>기존 사이트 콘텐츠/디자인 분석</h2>
                </div>
                
                <div class="analysis-subtitle">콘텐츠 및 커뮤니케이션, 페이지 디자인</div>
                
                <div class="asis-issues-grid">
                    <div class="asis-issue-card">
                        <div class="issue-num">1</div>
                        <div class="issue-content">
                            <div class="issue-title">콘텐츠 페이지 레이아웃과 요소가 반복됨</div>
                            <div class="issue-desc">웹페이지 전반의 레이아웃과 요소가 유사한 패턴으로 구성되어 콘텐츠가 차별화되지 않음</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">2</div>
                        <div class="issue-content">
                            <div class="issue-title">정적 디자인으로 인한 차별점 없는 UI</div>
                            <div class="issue-desc">콘텐츠 업로드 형식이 블로그와 유사하여 기업의 전문성이 다소 낮아 보임</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">3</div>
                        <div class="issue-content">
                            <div class="issue-title">콘텐츠 형식/디자인 요소 시각화 개선 필요</div>
                            <div class="issue-desc">본문에서 복잡한 이미지로 설명을 대체하는 경우가 많아 콘텐츠 형식 개선 필요</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">4</div>
                        <div class="issue-content">
                            <div class="issue-title">PC/MO 환경에서 공통적으로 가독성 낮음</div>
                            <div class="issue-desc">영상 콘텐츠 선택 시 레이어 팝업으로 노출되어 화면 활용도가 제한됨</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 03. 현황 분석 - 개인화 관점 (Slide 15) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">03</span>
                    <h2>기존 사이트 개인화 분석</h2>
                </div>
                
                <div class="analysis-subtitle">고객 개인화 맞춤 데이터 제공 부족</div>
                
                <div class="asis-issues-grid">
                    <div class="asis-issue-card">
                        <div class="issue-num">1</div>
                        <div class="issue-content">
                            <div class="issue-title">회원 로그인 시스템의 부재</div>
                            <div class="issue-desc">로그인 시스템이 없어 고객에게 개인화 데이터 분석, 맞춤 정보 제공이 불가능</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">2</div>
                        <div class="issue-content">
                            <div class="issue-title">고객에게 맞춤 데이터 제공 불가</div>
                            <div class="issue-desc">일시적 세션 기반의 사용자 정보를 제공하는 형식으로 정보의 정확성과 지속성이 낮음</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">3</div>
                        <div class="issue-content">
                            <div class="issue-title">개인화 메뉴가 있지만 부정확한 정보 제공</div>
                            <div class="issue-desc">마이페이지 메뉴가 존재하나 로그인 기반이 아닌 세션 기반의 정보 제공</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">4</div>
                        <div class="issue-content">
                            <div class="issue-title">고객 데이터 축적 불가</div>
                            <div class="issue-desc">고객 데이터를 통한 트렌드 파악 및 상품 개발이 중요한데 데이터 수집이 되지 않음</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 03. 현황 분석 - 사용자 경험 관점 (Slide 16) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">03</span>
                    <h2>기존 사이트 사용자 경험 분석</h2>
                </div>
                
                <div class="analysis-subtitle">사용자 경험 측면 및 시스템 환경</div>
                
                <div class="asis-issues-grid">
                    <div class="asis-issue-card">
                        <div class="issue-num">1</div>
                        <div class="issue-content">
                            <div class="issue-title">PC 기반으로 설계된 가로형 UI 구조</div>
                            <div class="issue-desc">PC 기반의 레이아웃, 해상도, 가로형 스크롤로 설계된 페이지가 많아 모바일 사용성 낮음</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">2</div>
                        <div class="issue-content">
                            <div class="issue-title">모바일 퍼스트 기반의 웹사이트 구성 필요</div>
                            <div class="issue-desc">모바일 퍼스트를 기본으로 하는 메뉴 설계와 페이지, 콘텐츠 구성 필요</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">3</div>
                        <div class="issue-content">
                            <div class="issue-title">문서디자인 형식으로 가독성 낮은 페이지 다수</div>
                            <div class="issue-desc">텍스트 중심의 페이지, 인포그래픽 및 시각화 자료가 문서디자인 형식</div>
                        </div>
                    </div>
                    <div class="asis-issue-card">
                        <div class="issue-num">4</div>
                        <div class="issue-content">
                            <div class="issue-title">최적화 이슈로 부정적 사용자 경험</div>
                            <div class="issue-desc">페이지 및 콘텐츠 로딩 속도가 느리고, 폰트 적용에 시간이 소요됨</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 03. 현황 분석 - 주요 개선 포인트 (Slide 17) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">03</span>
                    <h2>주요 개선 포인트와 방향</h2>
                </div>
                
                <div class="improvement-direction">
                    <h3>ASIS ${industryName} 웹사이트의 주요 개선 포인트와 개선 방향은,</h3>
                </div>
                
                <div class="improvement-cards-grid">
                    <div class="improvement-card">
                        <div class="improve-icon">🎯</div>
                        <div class="improve-title">고객이 보고 싶은 정보를 직관적으로 볼 수 있는 구조</div>
                        <div class="improve-desc">직관적이고 유연한 정보 구조 배치로 원하는 정보를 쉽게 찾을 수 있는 메뉴 및 화면 구성</div>
                        <ul class="improve-actions">
                            <li>대화형 AI 검색을 통한 정보, 인사이트 제공</li>
                            <li>브랜드 톤앤매너와 페르소나 정의를 통한 일관된 경험</li>
                        </ul>
                    </div>
                    <div class="improvement-card">
                        <div class="improve-icon">📖</div>
                        <div class="improve-title">초보 고객도 쉽게 읽히는 비주얼 디자인 콘텐츠</div>
                        <div class="improve-desc">어렵고 복잡한 내용을 쉽게 이해할 수 있는 디자인 요소와 인터랙션의 경험적 콘텐츠 구성</div>
                        <ul class="improve-actions">
                            <li>데이터 시각화 강화</li>
                            <li>마이크로카피 및 UX라이팅 개선</li>
                        </ul>
                    </div>
                    <div class="improvement-card">
                        <div class="improve-icon">📱</div>
                        <div class="improve-title">접근성 향상을 통한 사용자 경험 개선</div>
                        <div class="improve-desc">반응형, 모바일 기반 설계와 디자인을 통해 고객의 접근성을 높이는 방향 개선</div>
                        <ul class="improve-actions">
                            <li>모바일 퍼스트 기반 웹사이트 구성</li>
                            <li>광범위한 고객층 대응</li>
                        </ul>
                    </div>
                </div>
                
                <div class="improvement-conclusion">
                    <p><strong>모바일 기반으로 정보 구조, 비주얼 요소, 사용자 여정 개선을 통해 고객이 필요한 정보와 인사이트를 한 곳에서 모두 제공할 수 있는 AI ${ind.keyword} 플랫폼으로 전환</strong></p>
                </div>
            </div>
            
            <!-- TOBE 구분선 -->
            <div class="proposal-divider tobe">
                <span class="divider-label">TOBE</span>
                <div class="divider-sections">
                    <span>04 솔루션 전략</span>
                    <span>05 IA & 디자인</span>
                    <span>06 주요 기능</span>
                    <span>07 기술 & AI</span>
                </div>
            </div>
            
            <!-- 04. 솔루션 전략 (Slide 10) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">04</span>
                    <h2>솔루션 전략</h2>
                </div>
                
                <div class="strategy-vision">
                    <div class="vision-keyword">${ind.keyword}</div>
                    <div class="vision-slogan">One Platform, Smarter ${ind.keyword} Experience</div>
                </div>
                
                <h3>핵심 솔루션</h3>
                <div class="solution-grid">
                    ${ind.solutions.map((sol, i) => `
                    <div class="solution-card">
                        <div class="sol-num">${String(i + 1).padStart(2, '0')}</div>
                        <div class="sol-content">
                            <div class="sol-title">${sol}</div>
                            <div class="sol-desc">${ind.painPoints[i] ? ind.painPoints[i] + ' 문제를 해결합니다' : '사용자 경험을 혁신합니다'}</div>
                        </div>
                    </div>
                    `).join('')}
                </div>
                
                <h3>기대효과</h3>
                <div class="benefit-grid">
                    ${ind.kpi.map((kpi, i) => `
                    <div class="benefit-card">
                        <div class="benefit-icon">${['📈', '⏱️', '💰', '❤️'][i % 4]}</div>
                        <div class="benefit-text">${kpi}</div>
                    </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- 04. 리뉴얼 전략 - 콘텐츠 개선 (Slide 19) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">04</span>
                    <h2>콘텐츠 개선 전략</h2>
                </div>
                
                <div class="strategy-subtitle">신뢰와 데이터를 기반으로 콘텐츠 최적화</div>
                
                <div class="content-strategy-grid">
                    <div class="content-strategy-card">
                        <div class="cs-icon">🔍</div>
                        <div class="cs-title">SEO/AIO 기반 콘텐츠 최적화</div>
                        <ul class="cs-list">
                            <li>키워드 기반 블로그, 뉴스룸, 리포트 코너 구축</li>
                            <li>메타태그, 제목 구조, 이미지 ALT 등 기술적 SEO</li>
                            <li>FAQ, 가이드, 용어사전 등 '질문 기반 콘텐츠' 확보</li>
                        </ul>
                    </div>
                    <div class="content-strategy-card">
                        <div class="cs-icon">📅</div>
                        <div class="cs-title">시의성 있는 콘텐츠 제공</div>
                        <ul class="cs-list">
                            <li>주요 이벤트·정책에 맞춘 타이밍 콘텐츠</li>
                            <li>분기별, 월별 인사이트</li>
                            <li>뉴스 + 분석 콘텐츠 결합</li>
                        </ul>
                    </div>
                    <div class="content-strategy-card">
                        <div class="cs-icon">🛤️</div>
                        <div class="cs-title">고객 여정에 따른 콘텐츠 배치</div>
                        <ul class="cs-list">
                            <li><strong>인지 단계:</strong> 트렌드, 이슈 요약</li>
                            <li><strong>고려 단계:</strong> 비교, 사례, 영상 콘텐츠</li>
                            <li><strong>전환 단계:</strong> 1:1 문의, 간편 가입 UX</li>
                        </ul>
                    </div>
                </div>
                
                <div class="strategy-insight">
                    <p>잠재 고객들이 검색을 통해 신뢰할 수 있는 브랜드와 콘텐츠를 확인하고, 유용한 콘텐츠에 머물며 자연스럽게 서비스/상품 관심으로 전환되도록 유도</p>
                </div>
            </div>
            
            <!-- 04. 리뉴얼 전략 - 개인화 서비스 (Slide 20) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">04</span>
                    <h2>개인화 서비스 전략</h2>
                </div>
                
                <div class="strategy-subtitle">AI 기술 활용을 통한 개인화 서비스</div>
                
                <div class="personalization-grid">
                    <div class="personal-service-card">
                        <div class="ps-icon">🤖</div>
                        <div class="ps-title">자연어 기반 AI 검색/상담</div>
                        <div class="ps-desc">사용자가 질문하듯 입력하면 관련 정보를 자연어로 응답</div>
                        <ul class="ps-features">
                            <li>상품, 리포트, 용어 등 복합 정보 대화형 응대</li>
                            <li>고객의 이전 질문 등을 반영한 연속적 맥락 대응</li>
                        </ul>
                    </div>
                    <div class="personal-service-card">
                        <div class="ps-icon">📊</div>
                        <div class="ps-title">AI 기반 개인화 마이페이지</div>
                        <div class="ps-desc">관심사, 이력 등을 실시간 반영한 맞춤 대시보드</div>
                        <ul class="ps-features">
                            <li>현황, 실적 등을 직관적으로 시각화</li>
                            <li>개인별 리마인더, 제안, 목표 달성률 추적</li>
                        </ul>
                    </div>
                    <div class="personal-service-card">
                        <div class="ps-icon">📚</div>
                        <div class="ps-title">사용자 관심별 콘텐츠 큐레이션</div>
                        <div class="ps-desc">검색/열람 이력과 관심사 분석을 통한 맞춤 콘텐츠</div>
                        <ul class="ps-features">
                            <li>최신 리서치, 마켓 인사이트 맞춤 제공</li>
                            <li>푸시·메일·마이페이지를 통한 콘텐츠 제안</li>
                        </ul>
                    </div>
                </div>
                
                <div class="strategy-insight">
                    <p>AI 기반 검색·상담, 개인 맞춤 마이페이지, 관심 기반 콘텐츠 큐레이션을 통해 사용자가 원하는 정보를 직관적이고 능동적으로 경험할 수 있는 개인화 서비스 제공</p>
                </div>
            </div>
            
            <!-- 04. 리뉴얼 전략 - 시스템 개발 (Slide 21) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">04</span>
                    <h2>시스템 개발 전략</h2>
                </div>
                
                <div class="strategy-subtitle">효율적인 운영을 위한 시스템 개발</div>
                
                <div class="system-dev-grid">
                    <div class="system-dev-card">
                        <div class="sd-icon">📝</div>
                        <div class="sd-title">콘텐츠 업데이트 및 관리</div>
                        <ul class="sd-features">
                            <li>관리자 페이지에서 콘텐츠 손쉽게 등록·수정</li>
                            <li>카테고리, 태그, 키워드 기반 콘텐츠 분류 및 검색</li>
                            <li>발행일 자동화, 예약 기능 등 효율적 운영</li>
                            <li>열람수 기반 자동 추천 콘텐츠 구성</li>
                        </ul>
                    </div>
                    <div class="system-dev-card">
                        <div class="sd-icon">📈</div>
                        <div class="sd-title">고객 행동 데이터 분석 지원</div>
                        <ul class="sd-features">
                            <li>방문자 유입 경로, 체류 시간, 클릭 패턴 실시간 수집</li>
                            <li>관심 콘텐츠 열람 이력 기반 선호도 분석</li>
                            <li>AI 기반 전환 가능성 예측 및 개인화 콘텐츠 제공</li>
                            <li>대시보드 형태의 관리자 분석 도구 제공</li>
                        </ul>
                    </div>
                    <div class="system-dev-card">
                        <div class="sd-icon">🔐</div>
                        <div class="sd-title">소셜 로그인 활용 고객 관리</div>
                        <ul class="sd-features">
                            <li>카카오, 네이버, 구글 등 소셜 계정 연동 간편 회원가입</li>
                            <li>로그인 기반 관심사 저장, 열람 이력 개인화</li>
                            <li>비로그인/로그인 사용자 행동 비교 분석</li>
                            <li>리드 수집 및 고객 세분화 마케팅 자동화</li>
                        </ul>
                    </div>
                </div>
                
                <div class="strategy-insight">
                    <p>콘텐츠를 효율적으로 업데이트·관리하고, 고객 행동 데이터를 분석해 맞춤형 서비스를 제공하며, 소셜 로그인을 통한 간편한 고객 관리로 운영 효율성과 사용자 경험을 강화</p>
                </div>
            </div>
            
            <!-- 05. UX & 시스템 구축 - 디자인 컨셉 1 (Slide 22) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">05</span>
                    <h2>디자인 전략 및 컨셉</h2>
                </div>
                
                <div class="design-concept-main">
                    <div class="concept-keyword">Connected Confidence.</div>
                    <div class="concept-tagline">데이터와 사람, 브랜드와 경험이 하나로 연결되는 신뢰</div>
                </div>
                
                <div class="concept-description">
                    <p>${industryName}는 데이터로 말하고, 사람의 언어로 신뢰를 쌓습니다.</p>
                    <p>${ind.keyword}라는 영역은 숫자와 논리로 설득되지만, 진짜 신뢰는 <strong>'이해되는 경험'</strong>에서 완성됩니다.</p>
                    <p>우리는 복잡한 정보를 명료하게 해석하고, 그 데이터를 사용자의 여정 속에 자연스럽게 연결합니다.</p>
                </div>
            </div>
            
            <!-- 05. UX & 시스템 구축 - 디자인 컨셉 2 (Slide 23) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">05</span>
                    <h2>Proactive UX for Confidence</h2>
                </div>
                
                <div class="design-approach-subtitle">정보가 고객에게 먼저 다가와 신뢰와 확신으로 이어지는 UX 경험</div>
                
                <div class="design-approach-grid">
                    <div class="approach-card">
                        <div class="approach-label">Design</div>
                        <div class="approach-title">Readable Design.</div>
                        <div class="approach-desc">정보가 '보이는' 디자인이 아닌 '읽히는' 디자인<br>쉽게 해석하고 이해할 수 있도록 구조화</div>
                    </div>
                    <div class="approach-card">
                        <div class="approach-label">Contents</div>
                        <div class="approach-title">Desirable Contents.</div>
                        <div class="approach-desc">고객의 눈높이에서 이해하기 쉽게<br>잘 정리 및 선별된 호감 콘텐츠</div>
                    </div>
                    <div class="approach-card">
                        <div class="approach-label">Development</div>
                        <div class="approach-title">Connected Dev.</div>
                        <div class="approach-desc">데이터+서비스+고객 관리가<br>유기적으로 통합된 관리시스템</div>
                    </div>
                </div>
            </div>
            
            <!-- 05. 디자인 시스템 - Trend (Slide 24) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">05</span>
                    <h2>${industryName} 디자인 트렌드</h2>
                </div>
                
                <div class="trend-main-title">모바일 뱅킹/핀테크의 공통적인 4가지 방향</div>
                
                <div class="design-trend-grid">
                    <div class="design-trend-card">
                        <div class="dt-icon">📱</div>
                        <div class="dt-title">모바일이 중심 채널로 고착</div>
                        <div class="dt-desc">언제, 어디서든 정보를 확인할 수 있는 신뢰, 투명성 기반 모바일 중심 경험</div>
                    </div>
                    <div class="design-trend-card">
                        <div class="dt-icon">🎯</div>
                        <div class="dt-title">AI 기반 개인화/맞춤형 경험</div>
                        <div class="dt-desc">사용자별 맞춤형 정보 & 인사이트 제공으로 개인화된 경험</div>
                    </div>
                    <div class="design-trend-card">
                        <div class="dt-icon">💬</div>
                        <div class="dt-title">대화형 인터페이스와 자연어 탐색</div>
                        <div class="dt-desc">정보 검색과 상품 탐색을 말하듯 쉽게 자연어로 처리</div>
                    </div>
                    <div class="design-trend-card">
                        <div class="dt-icon">📊</div>
                        <div class="dt-title">미니멀 UI + 데이터 시각화</div>
                        <div class="dt-desc">복잡한 정보를 쉽고, 읽히게 보여주는 요약 중심 설계</div>
                    </div>
                </div>
            </div>
            
            <!-- 05. 디자인 시스템 - UI Readable (Slide 25) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">05</span>
                    <h2>UI & Visual - Readable</h2>
                </div>
                
                <div class="ui-concept-subtitle">정보를 읽히는 구조로 바꾸는 UX</div>
                <div class="ui-concept-desc">정보를 더 쉽게 읽고 이해할 수 있도록</div>
                
                <div class="ui-principle-grid">
                    <div class="ui-principle-card">
                        <div class="up-title">데이터 시각화</div>
                        <div class="up-desc">복잡한 데이터를 한눈에 읽히도록 구조화, 단순화, 의미 전달에 중점</div>
                        <div class="up-benefit">초보자도 데이터가 읽히는 경험</div>
                    </div>
                    <div class="ui-principle-card">
                        <div class="up-title">여백 중심, 아이콘 의미 보조</div>
                        <div class="up-desc">복잡한 개념은 아이콘, 라벨로 즉시 의미 파악 가능하게</div>
                        <div class="up-benefit">시각적 복잡도를 낮추면서 의미·맥락·가독성 강화</div>
                    </div>
                    <div class="ui-principle-card">
                        <div class="up-title">카드 중심 UI</div>
                        <div class="up-desc">카드 형태의 반복되는 구조로 사용자가 읽는 리듬을 형성</div>
                        <div class="up-benefit">복잡한 개념을 작은 덩어리로 인지</div>
                    </div>
                </div>
            </div>
            
            <!-- 05. 디자인 시스템 - UI Proactive (Slide 26) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">05</span>
                    <h2>UI & Visual - Proactive</h2>
                </div>
                
                <div class="ui-concept-subtitle">사용자보다 먼저 정보가 다가오는 능동적 UX</div>
                <div class="ui-concept-desc">사용자의 행동을 유도하는 능동형 인터페이스 구현</div>
                
                <div class="ui-principle-grid">
                    <div class="ui-principle-card">
                        <div class="up-title">시선을 먼저 끌어주는 AI 기능</div>
                        <div class="up-desc">첫 화면을 자연어 기반 검색/질문과 부드러운 인터랙션으로 필요한 정보를 자연스럽게 안내</div>
                        <div class="up-benefit">하단 영역에 대화창을 항상 노출하여 언제든 사용자 요구에 반응</div>
                    </div>
                    <div class="ui-principle-card">
                        <div class="up-title">Guided Motion, 제안형 UI</div>
                        <div class="up-desc">부드러운 등장, 위치 이동 움직임으로 먼저 제안, 업데이트 느낌을 시각적으로 부여</div>
                        <div class="up-benefit">AI 영역의 색상 변화 인터랙션으로 능동적, 즉각적 서비스 느낌</div>
                    </div>
                    <div class="ui-principle-card">
                        <div class="up-title">개인화</div>
                        <div class="up-desc">이용 패턴이 누적될수록 개인 맞춤이 정교화되고 개인화된 정보 노출</div>
                        <div class="up-benefit">내 상황을 먼저 이해하고 제안하는 서비스 느낌 제공</div>
                    </div>
                </div>
            </div>
            
            <!-- 05. 디자인 시스템 - UI Connected (Slide 27) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">05</span>
                    <h2>UI & Visual - Connected</h2>
                </div>
                
                <div class="ui-concept-subtitle">데이터+서비스+UI가 유기적으로 통합된 UX</div>
                <div class="ui-concept-desc">정보의 맥락에 따라 다양한 정보를 함께 제공</div>
                
                <div class="ui-principle-grid">
                    <div class="ui-principle-card">
                        <div class="up-title">통합된 카드 패턴</div>
                        <div class="up-desc">다양한 상품, 콘텐츠를 어떤 화면에서도 동일한 레이아웃과 모듈 구조를 유지</div>
                        <div class="up-benefit">단절감을 없애고 한 흐름 안에 있는 느낌 제공</div>
                    </div>
                    <div class="ui-principle-card">
                        <div class="up-title">구조적 연속성 유지</div>
                        <div class="up-desc">화면이 바뀌어도 형태를 유지하여 콘텐츠를 하나의 체계 안에서 인지하도록</div>
                        <div class="up-benefit">사용자가 모든 정보를 같은 체계 안에서 인지</div>
                    </div>
                    <div class="ui-principle-card">
                        <div class="up-title">브랜드 아이덴티티</div>
                        <div class="up-desc">브랜드 톤앤매너와 아이덴티티를 인터페이스 톤에 일관되게 적용</div>
                        <div class="up-benefit">브랜드만의 철학을 자연스럽게 느낄 수 있도록</div>
                    </div>
                </div>
            </div>
            
            <!-- 05. IA 정보구조 (Slide 28) - 동적 IA -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">05</span>
                    <h2>정보구조 (IA)</h2>
                </div>
                
                <div class="ia-intro">선택된 <strong>${features.length}개</strong>의 주요 기능을 기반으로 최적화된 정보구조를 제안합니다</div>
                
                <div class="ia-diagram-new">
                    <div class="ia-root-new">${industryName}</div>
                    <div class="ia-branches-new">
                        ${dynamicIA.map(ia => `
                        <div class="ia-branch-new">
                            <div class="ia-main-new">${ia.main}</div>
                            <div class="ia-subs-new">
                                ${ia.sub.map(s => `<div class="ia-sub-new">${s}</div>`).join('')}
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="ia-note">
                    <strong>📌 주요 특징:</strong> ${features.slice(0, 5).join(', ')}${features.length > 5 ? ' 외 ' + (features.length - 5) + '개' : ''}의 기능이 반영된 구조
                </div>
            </div>
            
            <!-- 05. 디자인 시스템 (Slide 12) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">05</span>
                    <h2>디자인 시스템</h2>
                </div>
                
                <div class="design-direction">
                    <div class="design-keyword">${ind.value}</div>
                    <div class="design-desc">${industryName} 플랫폼의 브랜드 가치를 시각적으로 표현하는 디자인 시스템</div>
                </div>
                
                <div class="design-principles">
                    <div class="principle-card">
                        <div class="principle-num">01</div>
                        <div class="principle-title">명확성</div>
                        <div class="principle-desc">직관적인 네비게이션과 정보 계층</div>
                    </div>
                    <div class="principle-card">
                        <div class="principle-num">02</div>
                        <div class="principle-title">일관성</div>
                        <div class="principle-desc">통일된 컴포넌트와 스타일 가이드</div>
                    </div>
                    <div class="principle-card">
                        <div class="principle-num">03</div>
                        <div class="principle-title">접근성</div>
                        <div class="principle-desc">WCAG 2.1 AA 수준 준수</div>
                    </div>
                    <div class="principle-card">
                        <div class="principle-num">04</div>
                        <div class="principle-title">반응성</div>
                        <div class="principle-desc">${platforms.join(', ')} 최적화</div>
                    </div>
                </div>
                
                <div class="color-system">
                    <h4>컬러 시스템</h4>
                    <div class="color-palette-new">
                        <div class="color-chip" style="background: #3B82F6"><span>Primary</span></div>
                        <div class="color-chip" style="background: #10B981"><span>Success</span></div>
                        <div class="color-chip" style="background: #F59E0B"><span>Warning</span></div>
                        <div class="color-chip" style="background: #EF4444"><span>Error</span></div>
                        <div class="color-chip" style="background: #1F2937"><span>Text</span></div>
                        <div class="color-chip" style="background: #F3F4F6; color: #374151"><span>BG</span></div>
                    </div>
                </div>
            </div>
            
            <!-- 06. 주요 기능 상세 - 기능 목록 (Slide 13) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">06</span>
                    <h2>주요 기능 상세</h2>
                </div>
                
                <div class="feature-summary">
                    <div class="summary-total">총 <strong>${features.length}</strong>개의 핵심 기능</div>
                    <div class="summary-platforms">플랫폼: ${platforms.join(' / ')}</div>
                </div>
                
                <div class="feature-detail-grid">
                    ${featureDetails.map((f, i) => `
                    <div class="feature-detail-card">
                        <div class="feature-detail-header">
                            <span class="feature-detail-icon">${f.icon}</span>
                            <span class="feature-detail-num">F${String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <div class="feature-detail-title">${f.name}</div>
                        <div class="feature-detail-desc">${f.desc}</div>
                        <div class="feature-detail-meta">
                            <span class="priority ${f.priority === '필수' ? 'required' : ''}">${f.priority}</span>
                            <span class="complexity">복잡도: ${f.complexity}</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- 06. 주요 기능 상세 - 기능별 화면 (Slide 14-15) -->
            ${features.slice(0, 4).map((feature, idx) => `
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">06</span>
                    <h2>기능 상세 - ${feature}</h2>
                </div>
                
                <div class="feature-screen">
                    <div class="screen-left">
                        <h3>기능 개요</h3>
                        <div class="feature-overview">
                            <p>${featureDetails[idx]?.desc || '사용자 경험 향상을 위한 핵심 기능입니다.'}</p>
                        </div>
                        
                        <h4>주요 화면</h4>
                        <ul class="screen-list">
                            <li>${feature} 메인 화면</li>
                            <li>${feature} 상세 화면</li>
                            <li>${feature} 결과 화면</li>
                        </ul>
                        
                        <h4>사용자 플로우</h4>
                        <div class="user-flow">
                            <span class="flow-step">진입</span>
                            <span class="flow-arrow">→</span>
                            <span class="flow-step">선택</span>
                            <span class="flow-arrow">→</span>
                            <span class="flow-step">확인</span>
                            <span class="flow-arrow">→</span>
                            <span class="flow-step">완료</span>
                        </div>
                    </div>
                    <div class="screen-right">
                        <div class="screen-mockup">
                            <div class="mockup-header">${feature}</div>
                            <div class="mockup-content">
                                <div class="mockup-placeholder">
                                    <span class="mockup-icon">${featureDetails[idx]?.icon || '📱'}</span>
                                    <span class="mockup-text">화면 시안</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `).join('')}
            
            <!-- 07. 기술 스택 (Slide 16) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">07</span>
                    <h2>기술 스택</h2>
                </div>
                
                <h3>개발 환경</h3>
                <div class="tech-stack-grid">
                    <div class="tech-category">
                        <div class="tech-title">Frontend</div>
                        <div class="tech-items">
                            <span class="tech-item">React / Next.js</span>
                            <span class="tech-item">TypeScript</span>
                            <span class="tech-item">Tailwind CSS</span>
                        </div>
                    </div>
                    <div class="tech-category">
                        <div class="tech-title">Backend</div>
                        <div class="tech-items">
                            <span class="tech-item">Node.js / NestJS</span>
                            <span class="tech-item">PostgreSQL</span>
                            <span class="tech-item">Redis</span>
                        </div>
                    </div>
                    <div class="tech-category">
                        <div class="tech-title">AI / ML</div>
                        <div class="tech-items">
                            ${ind.techStack.map(t => `<span class="tech-item">${t}</span>`).join('')}
                        </div>
                    </div>
                    <div class="tech-category">
                        <div class="tech-title">Infra</div>
                        <div class="tech-items">
                            <span class="tech-item">AWS / GCP</span>
                            <span class="tech-item">Docker / K8s</span>
                            <span class="tech-item">CI/CD Pipeline</span>
                        </div>
                    </div>
                </div>
                
                <h3>AI 기능 계획</h3>
                <div class="ai-feature-grid">
                    ${ind.solutions.filter(s => s.includes('AI') || s.includes('추천') || s.includes('분석')).slice(0, 3).map((sol, i) => `
                    <div class="ai-feature-card">
                        <div class="ai-icon">🤖</div>
                        <div class="ai-title">${sol}</div>
                        <div class="ai-desc">${industryName} 고객 맞춤형 AI 서비스</div>
                    </div>
                    `).join('') || `
                    <div class="ai-feature-card">
                        <div class="ai-icon">🤖</div>
                        <div class="ai-title">AI 추천 시스템</div>
                        <div class="ai-desc">개인화된 상품/콘텐츠 추천</div>
                    </div>
                    <div class="ai-feature-card">
                        <div class="ai-icon">💬</div>
                        <div class="ai-title">AI 챗봇</div>
                        <div class="ai-desc">24시간 자동 고객 응대</div>
                    </div>
                    <div class="ai-feature-card">
                        <div class="ai-icon">📊</div>
                        <div class="ai-title">데이터 분석</div>
                        <div class="ai-desc">고객 행동 분석 및 인사이트</div>
                    </div>
                    `}
                </div>
            </div>
            
            <!-- 07. AI 기능 기획 - AI 서비스 목표 (Slide 40) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">07</span>
                    <h2>AI 서비스 목표</h2>
                </div>
                
                <div class="ai-service-goal-box">
                    <div class="ai-goal-quote">"${ind.keyword}에 대해 궁금한 게 생길 때,<br>플랫폼에 와서 그냥 말하듯이 물어보면,<br>나에게 맞는 설명과 추천을 한 번에 보여주는 서비스"</div>
                </div>
                
                <div class="ai-core-goal">
                    <h4>핵심 목표</h4>
                    <p>고객이 원하는 방식으로 질문하면, AI가 개인별 맞춤 답변과 함께 관련 콘텐츠를 한 화면에 통합하여 제공.<br>
                    자연어 통합검색과 개인별 추천을 결합해 상담과 전환까지 자연스럽게 연결하는 지능형 플랫폼 경험 구현.</p>
                </div>
            </div>
            
            <!-- 07. AI 기능 기획 - 시나리오 정의 (Slide 41) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">07</span>
                    <h2>AI 시나리오 정의</h2>
                </div>
                
                <div class="scenario-intro">플랫폼이 만나게 될 두 가지 전형적인 고객 유형을 선정하여<br>각각 다른 경험과 니즈를 가진 고객들이 동일한 플랫폼에서 맞춤 경험을 얻을 수 있도록 설계</div>
                
                <div class="persona-comparison-grid">
                    <div class="persona-scenario-card">
                        <div class="persona-avatar-large">👩</div>
                        <div class="persona-name-large">${ind.persona.name} (${ind.persona.age}세)</div>
                        <div class="persona-job">${ind.persona.job}</div>
                        <div class="persona-type">초보 고객</div>
                        <div class="persona-desc-large">${ind.persona.desc}</div>
                    </div>
                    <div class="persona-scenario-card">
                        <div class="persona-avatar-large">👨‍💼</div>
                        <div class="persona-name-large">전문 고객 B (40대)</div>
                        <div class="persona-job">대기업 과장, 경험 10년+</div>
                        <div class="persona-type">전문 고객</div>
                        <div class="persona-desc-large">명확한 조건으로 정교한 검색을 원하는 전문 사용자</div>
                    </div>
                </div>
            </div>
            
            <!-- 07. AI 기능 기획 - 시나리오 1 (Slide 42-44) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">07</span>
                    <h2>시나리오 1 - 초보 고객 여정</h2>
                </div>
                
                <div class="scenario-journey-grid">
                    <div class="scenario-step-card">
                        <div class="step-num">① 첫 방문</div>
                        <div class="step-title">검색을 통해 플랫폼에 처음 방문</div>
                        <div class="step-desc">복잡한 메뉴 구조를 탐색할 필요 없이, 홈페이지 중앙의 큰 질문형 검색창이 바로 눈에 들어옴</div>
                    </div>
                    <div class="scenario-step-card">
                        <div class="step-num">② 통합검색</div>
                        <div class="step-title">"쉽게 설명해줘"라고 질문</div>
                        <div class="step-desc">하나의 통합된 검색 결과 화면에서 AI 요약 설명 + 관련 상품 + 학습 콘텐츠를 동시에 제공</div>
                    </div>
                    <div class="scenario-step-card">
                        <div class="step-num">③ AI 개인화</div>
                        <div class="step-title">맞춤형 AI 검색 결과 제공</div>
                        <div class="step-desc">여러 번 방문하며 탐색한 패턴을 AI와 그래프DB가 분석하여 개인화된 인사이트와 추천 제공</div>
                    </div>
                </div>
                
                <div class="scenario-result">
                    <div class="result-title">AI 판단 결과</div>
                    <div class="result-content">"${ind.persona.age}대, ${ind.keyword} 경험 적음, 장기적 관점에 관심" → 개인화된 현황 분석 + 방향 제안 + 학습 자료 추천</div>
                </div>
            </div>
            
            <!-- 07. AI 기능 기획 - 시나리오 2 (Slide 45-47) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">07</span>
                    <h2>시나리오 2 - 전문 고객 여정</h2>
                </div>
                
                <div class="scenario-journey-grid">
                    <div class="scenario-step-card">
                        <div class="step-num">① 명확한 목적</div>
                        <div class="step-title">후보를 정해놓고 방문하는 40대</div>
                        <div class="step-desc">명확한 관심 분야와 후보 리스트를 이미 가지고 있으며, 상세 비교 분석을 원함</div>
                    </div>
                    <div class="scenario-step-card">
                        <div class="step-num">② 조건 검색</div>
                        <div class="step-title">구체적인 조건으로 정교한 질문 입력</div>
                        <div class="step-desc">"3년 이상, 수수료 낮고 안정적인 상품 알려줘" → 조건검색 + 상세 비교 결과 제공</div>
                    </div>
                    <div class="scenario-step-card">
                        <div class="step-num">③ AI 리포트</div>
                        <div class="step-title">맞춤형 AI 포트폴리오 리포트</div>
                        <div class="step-desc">행동 패턴 분석을 통해 "장기 보유 전제의 성장형에 강한 관심"으로 판단, 맞춤 리포트 자동 생성</div>
                    </div>
                </div>
                
                <div class="scenario-result">
                    <div class="result-title">AI 판단 결과</div>
                    <div class="result-content">"40대, 경험 풍부, 구체적 조건 검색" → 상세 비교 분석 + AI 포트폴리오 리포트 + 전문가 상담 연결</div>
                </div>
            </div>
            
            <!-- 07. AI 기능 기획 - 단계별 개발 프로세스 (Slide 49-52) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">07</span>
                    <h2>AI 단계별 개발 프로세스</h2>
                </div>
                
                <div class="ai-dev-process-grid">
                    <div class="ai-process-card">
                        <div class="process-step-num">Step 1</div>
                        <div class="process-title">데이터 표준화</div>
                        <div class="process-subtitle">흩어진 데이터를 한 곳에, 같은 틀로</div>
                        <ul class="process-items">
                            <li>표준 정보 테이블 구축</li>
                            <li>성과/가격/구성 통합 테이블 설계</li>
                            <li>문서 메타정보 + 문단 단위 텍스트 테이블 생성</li>
                        </ul>
                    </div>
                    <div class="ai-process-card">
                        <div class="process-step-num">Step 2</div>
                        <div class="process-title">온톨로지 설계</div>
                        <div class="process-subtitle">체계적인 분류 체계로 자연어 질문을 조건으로 변환</div>
                        <ul class="process-items">
                            <li>자산군, 지역, 테마 등 분류 체계 적용</li>
                            <li>위험 수준 분류</li>
                            <li>자연어 질문을 검색 조건으로 자동 변환</li>
                        </ul>
                    </div>
                    <div class="ai-process-card">
                        <div class="process-step-num">Step 3</div>
                        <div class="process-title">검색 + 벡터 인덱스</div>
                        <div class="process-subtitle">후보 상품과 적합 이유를 동시에 답변</div>
                        <ul class="process-items">
                            <li>검색 인덱스: 조건 기반 필터링</li>
                            <li>벡터 인덱스: 의미 기반 유사도 검색</li>
                            <li>상품 리스트 + 근거 설명 동시 제공</li>
                        </ul>
                    </div>
                    <div class="ai-process-card">
                        <div class="process-step-num">Step 4</div>
                        <div class="process-title">그래프 DB</div>
                        <div class="process-subtitle">관계를 이해하는 두 번째 뇌</div>
                        <ul class="process-items">
                            <li>상품 ↔ 테마 ↔ 고객 행동 관계망 구축</li>
                            <li>유사 상품 자동 추천</li>
                            <li>개인별 맞춤 리포트 생성</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- 07. AI 기능 기획 - AI 관리자 페이지 (Slide 55) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">07</span>
                    <h2>AI 관리자 페이지</h2>
                </div>
                
                <div class="ai-admin-subtitle">AI는 한 번 구축하고 끝나는 것이 아니라, 지속적으로 모니터링하고 개선해야 하는 살아있는 시스템</div>
                
                <div class="ai-admin-grid">
                    <div class="ai-admin-card">
                        <div class="admin-icon">📊</div>
                        <div class="admin-title">대시보드</div>
                        <div class="admin-desc">방문통계, 검색/AI 분석, 인기 키워드, 시스템 알림</div>
                    </div>
                    <div class="ai-admin-card">
                        <div class="admin-icon">🤖</div>
                        <div class="admin-title">AI 관리</div>
                        <div class="admin-desc">RAG 소스 관리, 정보연결/그래프 관리, 검색 품질관리</div>
                    </div>
                    <div class="ai-admin-card">
                        <div class="admin-icon">👥</div>
                        <div class="admin-title">개인화 관리</div>
                        <div class="admin-desc">관심 테마 분석, 행동 로그, 추천 알고리즘 설정</div>
                    </div>
                    <div class="ai-admin-card">
                        <div class="admin-icon">📈</div>
                        <div class="admin-title">운영 리포트</div>
                        <div class="admin-desc">AI 사용량, 인기상품/검색, 콘텐츠 조회수 분석</div>
                    </div>
                </div>
                
                <div class="ai-admin-note">
                    <p><strong>구현 방안:</strong> AI 품질을 "켜놓고 방치"가 아니라 운영자가 함께 튜닝하는 구조로 설계</p>
                </div>
            </div>
            
            <!-- 07. AI 기능 기획 - 안전한 AI 운영 (Slide 56) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">07</span>
                    <h2>안전한 AI 운영 관리 체계</h2>
                </div>
                
                <div class="ai-safety-subtitle">${industryName} 서비스에서 AI를 운영할 때는 기술적 완성도 만큼이나 보안, 규제 준수, 소비자 보호가 중요</div>
                
                <div class="ai-safety-grid">
                    <div class="ai-safety-card">
                        <div class="safety-num">1</div>
                        <div class="safety-title">데이터 보안</div>
                        <ul class="safety-items">
                            <li>개인정보 암호화 및 접근 통제</li>
                            <li>데이터 마스킹 처리</li>
                            <li>로그 모니터링 및 이상 탐지</li>
                        </ul>
                    </div>
                    <div class="ai-safety-card">
                        <div class="safety-num">2</div>
                        <div class="safety-title">AI 윤리 준수</div>
                        <ul class="safety-items">
                            <li>편향성 검증 및 공정성 확보</li>
                            <li>AI 판단 근거 설명 가능성</li>
                            <li>부적절한 응답 필터링</li>
                        </ul>
                    </div>
                    <div class="ai-safety-card">
                        <div class="safety-num">3</div>
                        <div class="safety-title">규제 대응</div>
                        <ul class="safety-items">
                            <li>관련 법규 준수 체계</li>
                            <li>AI 서비스 고지 의무 이행</li>
                            <li>정기 감사 및 보고 체계</li>
                        </ul>
                    </div>
                    <div class="ai-safety-card">
                        <div class="safety-num">4</div>
                        <div class="safety-title">품질 관리</div>
                        <ul class="safety-items">
                            <li>응답 정확도 모니터링</li>
                            <li>사용자 피드백 수집 및 반영</li>
                            <li>지속적 모델 개선 체계</li>
                        </ul>
                    </div>
                </div>
                
                <div class="ai-safety-conclusion">
                    <p><strong>지속 가능하고 신뢰할 수 있는 AI 서비스 운영 체계를 통해 ${industryName}의 디지털 혁신을 안전하게 실현</strong></p>
                </div>
            </div>
            
            <!-- PLAN 구분선 -->
            <div class="proposal-divider plan">
                <span class="divider-label">PLAN</span>
                <div class="divider-sections">
                    <span>08 수행 계획</span>
                    <span>09 견적 및 투자</span>
                </div>
            </div>
            
            <!-- 08. 수행 계획 - 추진조직 (Slide 58) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">08</span>
                    <h2>수행 계획</h2>
                </div>
                
                <h3>추진조직 및 R&R</h3>
                <div class="org-intro">통합 PM 및 영역별 전문 PM 중심의 인력 구성으로 체계적인 프로젝트 수행</div>
                
                <div class="org-chart-new">
                    <div class="org-level org-top">
                        <div class="org-card-new pm">
                            <div class="org-icon">👨‍💼</div>
                            <div class="org-role">통합 PM</div>
                            <div class="org-count">${teamSize.pm}명 (고급)</div>
                        </div>
                    </div>
                    <div class="org-level org-middle">
                        <div class="org-team-group">
                            <div class="team-label">UIUX Plan / Design</div>
                            <div class="org-cards-row">
                                <div class="org-card-new"><div class="org-role">Art Director</div><div class="org-count">${teamSize.artDirector}명</div></div>
                                <div class="org-card-new"><div class="org-role">UI Planner</div><div class="org-count">${teamSize.uiPlanner}명</div></div>
                                <div class="org-card-new"><div class="org-role">Designer</div><div class="org-count">${teamSize.designer}명</div></div>
                                <div class="org-card-new"><div class="org-role">Publisher</div><div class="org-count">${teamSize.publisher}명</div></div>
                            </div>
                        </div>
                        <div class="org-team-group">
                            <div class="team-label">Front/Back-end 개발</div>
                            <div class="org-cards-row">
                                <div class="org-card-new"><div class="org-role">개발 PM</div><div class="org-count">1명</div></div>
                                <div class="org-card-new"><div class="org-role">Front-end</div><div class="org-count">${teamSize.frontDev}명</div></div>
                                <div class="org-card-new"><div class="org-role">Back-end</div><div class="org-count">${teamSize.backDev}명</div></div>
                            </div>
                        </div>
                        <div class="org-team-group">
                            <div class="team-label">AI Service 개발</div>
                            <div class="org-cards-row">
                                <div class="org-card-new"><div class="org-role">AI PM</div><div class="org-count">1명</div></div>
                                <div class="org-card-new"><div class="org-role">AI Planner</div><div class="org-count">${teamSize.aiPlanner}명</div></div>
                                <div class="org-card-new"><div class="org-role">AI Developer</div><div class="org-count">${teamSize.aiDev}명</div></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="team-total-new">
                    <div class="total-item">
                        <span class="total-label">총 투입 인력</span>
                        <span class="total-value">${Object.values(teamSize).reduce((a, b) => a + b, 0)}명</span>
                    </div>
                    <div class="total-item">
                        <span class="total-label">총 투입 공수</span>
                        <span class="total-value">${totalMM.total} MM</span>
                    </div>
                </div>
            </div>
            
            <!-- 08. 수행 계획 - 프로젝트 일정 (Slide 19) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">08</span>
                    <h2>프로젝트 수행일정</h2>
                </div>
                
                <div class="schedule-intro">프로젝트는 분석/설계 2개월, 개발 ${estimatedMonths - 2}개월을 포함하여 총 <strong>${estimatedMonths}개월</strong>간 수행됩니다</div>
                
                <table class="schedule-table">
                    <thead>
                        <tr>
                            <th>단계</th>
                            <th>상세업무</th>
                            <th>산출물</th>
                            ${Array.from({length: estimatedMonths}, (_, i) => `<th>M+${String(i + 1).padStart(2, '0')}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>요구분석</td>
                            <td>환경분석, 요구사항 정의</td>
                            <td>요구사항정의서</td>
                            <td class="gantt-cell active"></td>
                            ${Array.from({length: estimatedMonths - 1}, () => `<td class="gantt-cell"></td>`).join('')}
                        </tr>
                        <tr>
                            <td>IA/UX</td>
                            <td>정보구조, UX 전략</td>
                            <td>IA, 스토리보드</td>
                            <td class="gantt-cell active"></td>
                            <td class="gantt-cell active"></td>
                            ${Array.from({length: estimatedMonths - 2}, () => `<td class="gantt-cell"></td>`).join('')}
                        </tr>
                        <tr>
                            <td>디자인</td>
                            <td>UI 디자인, 시스템</td>
                            <td>Figma, 가이드</td>
                            <td class="gantt-cell"></td>
                            <td class="gantt-cell active"></td>
                            <td class="gantt-cell active"></td>
                            ${Array.from({length: estimatedMonths - 3}, () => `<td class="gantt-cell"></td>`).join('')}
                        </tr>
                        <tr>
                            <td>개발</td>
                            <td>Frontend/Backend</td>
                            <td>소스코드</td>
                            <td class="gantt-cell"></td>
                            <td class="gantt-cell"></td>
                            <td class="gantt-cell active"></td>
                            ${Array.from({length: estimatedMonths - 4}, () => `<td class="gantt-cell active"></td>`).join('')}
                            <td class="gantt-cell"></td>
                        </tr>
                        <tr>
                            <td>테스트</td>
                            <td>통합/사용자 테스트</td>
                            <td>테스트 리포트</td>
                            ${Array.from({length: estimatedMonths - 2}, () => `<td class="gantt-cell"></td>`).join('')}
                            <td class="gantt-cell active"></td>
                            <td class="gantt-cell active"></td>
                        </tr>
                        <tr>
                            <td>오픈</td>
                            <td>운영서버 이관</td>
                            <td>최종 산출물</td>
                            ${Array.from({length: estimatedMonths - 1}, () => `<td class="gantt-cell"></td>`).join('')}
                            <td class="gantt-cell active milestone"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- 09. 견적 및 투자 - 요약 (Slide 20) -->
            <div class="proposal-section estimate-section">
                <div class="section-header">
                    <span class="section-num">09</span>
                    <h2>투자 비용 요약</h2>
                </div>
                
                <div class="estimate-summary">
                    <div class="estimate-summary-item">
                        <span class="summary-label">총 예상 비용</span>
                        <span class="summary-value highlight">${estimate.total.toLocaleString()} 만원</span>
                    </div>
                    <div class="estimate-summary-item">
                        <span class="summary-label">예상 기간</span>
                        <span class="summary-value">${estimatedMonths}개월</span>
                    </div>
                    <div class="estimate-summary-item">
                        <span class="summary-label">투입 공수</span>
                        <span class="summary-value">${totalMM.total} M/M</span>
                    </div>
                    <div class="estimate-summary-item">
                        <span class="summary-label">업종 복잡도</span>
                        <span class="summary-value">${complexityRate >= 1.4 ? '높음' : complexityRate >= 1.2 ? '보통' : '낮음'}</span>
                    </div>
                </div>

                <h3 class="estimate-subtitle">📊 분야별 비용 내역</h3>
                <table class="estimate-table">
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>상세 내역</th>
                            <th>공수 (M/M)</th>
                            <th>금액 (만원)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="category-row">
                            <td colspan="4">UX/UI 기획</td>
                        </tr>
                        ${estimate.planning.items.map(item => `
                        <tr>
                            <td></td>
                            <td>${item.name}</td>
                            <td>${(item.cost / 550).toFixed(1)}</td>
                            <td class="amount">${item.cost.toLocaleString()}</td>
                        </tr>`).join('')}
                        <tr class="subtotal-row">
                            <td colspan="2">기획 소계</td>
                            <td>${totalMM.planning}</td>
                            <td class="amount">${estimate.planning.subtotal.toLocaleString()}</td>
                        </tr>
                        <tr class="category-row">
                            <td colspan="4">디자인</td>
                        </tr>
                        ${estimate.design.items.map(item => `
                        <tr>
                            <td></td>
                            <td>${item.name}</td>
                            <td>${(item.cost / 550).toFixed(1)}</td>
                            <td class="amount">${item.cost.toLocaleString()}</td>
                        </tr>`).join('')}
                        <tr class="subtotal-row">
                            <td colspan="2">디자인 소계</td>
                            <td>${totalMM.design}</td>
                            <td class="amount">${estimate.design.subtotal.toLocaleString()}</td>
                        </tr>
                        <tr class="category-row">
                            <td colspan="4">퍼블리싱</td>
                        </tr>
                        ${estimate.publishing.items.map(item => `
                        <tr>
                            <td></td>
                            <td>${item.name}</td>
                            <td>${(item.cost / 440).toFixed(1)}</td>
                            <td class="amount">${item.cost.toLocaleString()}</td>
                        </tr>`).join('')}
                        <tr class="subtotal-row">
                            <td colspan="2">퍼블리싱 소계</td>
                            <td>${totalMM.publishing}</td>
                            <td class="amount">${estimate.publishing.subtotal.toLocaleString()}</td>
                        </tr>
                        <tr class="category-row">
                            <td colspan="4">개발</td>
                        </tr>
                        ${estimate.development.items.map(item => `
                        <tr>
                            <td></td>
                            <td>${item.name}</td>
                            <td>${(item.cost / 550).toFixed(1)}</td>
                            <td class="amount">${item.cost.toLocaleString()}</td>
                        </tr>`).join('')}
                        <tr class="subtotal-row">
                            <td colspan="2">개발 소계</td>
                            <td>${(totalMM.frontend + totalMM.backend).toFixed(1)}</td>
                            <td class="amount">${estimate.development.subtotal.toLocaleString()}</td>
                        </tr>
                        <tr class="category-row">
                            <td colspan="4">PM/QA</td>
                        </tr>
                        ${estimate.pm.items.map(item => `
                        <tr>
                            <td></td>
                            <td>${item.name}</td>
                            <td>${(item.cost / 550).toFixed(1)}</td>
                            <td class="amount">${item.cost.toLocaleString()}</td>
                        </tr>`).join('')}
                        <tr class="subtotal-row">
                            <td colspan="2">PM/QA 소계</td>
                            <td>${totalMM.pm}</td>
                            <td class="amount">${estimate.pm.subtotal.toLocaleString()}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" class="total-label">합계 (VAT 별도)</td>
                            <td class="total-amount">${totalMM.total} M/M</td>
                            <td class="total-amount">${estimate.total.toLocaleString()} 만원</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <!-- 09. 견적 및 투자 - 플랫폼별 (Slide 21) -->
            <div class="proposal-section estimate-section">
                <div class="section-header">
                    <span class="section-num">09</span>
                    <h2>플랫폼별 비용</h2>
                </div>
                
                <div class="platform-estimate-grid">
                    ${platforms.map(p => {
                        const pc = platformCosts[p];
                        if (!pc) return '';
                        const platformTotal = pc.design + pc.publishing + pc.dev;
                        const platformIcons = {
                            shopify: '🛒', cafe24: '🏪', magento: '🔶', woocommerce: '🛍️',
                            godo: '🏬', makeshop: '🏪', wordpress: '📝', webflow: '🌊',
                            react: '⚛️', vue: '💚', flutter: '🦋', reactnative: '📱',
                            ios: '🍎', android: '🤖', custom: '🔧', admin: '⚙️'
                        };
                        return `
                        <div class="platform-estimate-card">
                            <div class="platform-icon">${platformIcons[p] || '🌐'}</div>
                            <div class="platform-name">${pc.name}</div>
                            <div class="platform-breakdown">
                                <div class="breakdown-item">
                                    <span>디자인</span>
                                    <span>${pc.design.toLocaleString()}만원</span>
                                </div>
                                ${pc.publishing > 0 ? `
                                <div class="breakdown-item">
                                    <span>퍼블리싱</span>
                                    <span>${pc.publishing.toLocaleString()}만원</span>
                                </div>` : ''}
                                <div class="breakdown-item">
                                    <span>개발</span>
                                    <span>${pc.dev.toLocaleString()}만원</span>
                                </div>
                            </div>
                            <div class="platform-total">
                                <span>플랫폼 비용</span>
                                <span class="total-value">${Math.round(platformTotal * complexityRate).toLocaleString()}만원</span>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
                
                <div class="estimate-note platform-note">
                    <p>※ 플랫폼 비용은 기본 구조 구축 비용이며, 기능별 개발비는 별도 산정됩니다.</p>
                    <p>※ 업종 복잡도(${complexityRate})가 반영된 금액입니다.</p>
                </div>
            </div>

            <!-- 09. 견적 및 투자 - 주요 기능별 (Slide 22) -->
            <div class="proposal-section estimate-section">
                <div class="section-header">
                    <span class="section-num">09</span>
                    <h2>주요 기능별 비용</h2>
                </div>
                
                <table class="feature-estimate-table">
                    <thead>
                        <tr>
                            <th>기능명</th>
                            <th>설명</th>
                            <th>기획</th>
                            <th>디자인</th>
                            <th>개발</th>
                            <th>합계 (만원)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${features.slice(0, 15).map(f => {
                            const cost = featureCosts[f] || featureCosts.default;
                            const total = Math.round((cost.planning + cost.design + cost.dev) * complexityRate);
                            return `
                        <tr>
                            <td class="feature-name">${f}</td>
                            <td class="feature-desc">${cost.desc}</td>
                            <td class="cost">${Math.round(cost.planning * complexityRate).toLocaleString()}</td>
                            <td class="cost">${Math.round(cost.design * complexityRate).toLocaleString()}</td>
                            <td class="cost">${Math.round(cost.dev * complexityRate).toLocaleString()}</td>
                            <td class="cost total">${total.toLocaleString()}</td>
                        </tr>`;
                        }).join('')}
                        ${features.length > 15 ? `
                        <tr class="more-features">
                            <td colspan="5">기타 ${features.length - 15}개 기능</td>
                            <td class="cost total">${Math.round(features.slice(15).reduce((sum, f) => {
                                const cost = featureCosts[f] || featureCosts.default;
                                return sum + (cost.planning + cost.design + cost.dev) * complexityRate;
                            }, 0)).toLocaleString()}</td>
                        </tr>` : ''}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" class="total-label">기능 개발 합계</td>
                            <td class="total-amount">${Math.round(features.reduce((sum, f) => {
                                const cost = featureCosts[f] || featureCosts.default;
                                return sum + (cost.planning + cost.design + cost.dev) * complexityRate;
                            }, 0)).toLocaleString()} 만원</td>
                        </tr>
                    </tfoot>
                </table>
                
                <div class="estimate-note">
                    <p>※ 본 견적은 제안 시점의 예상 견적이며, 상세 요구사항 확정 후 변동될 수 있습니다.</p>
                    <p>※ 업종 특성에 따른 복잡도 계수(${complexityRate})가 적용되었습니다.</p>
                    <p>※ 서버 호스팅, 외부 API 라이선스, 클라우드 비용 등 별도 비용은 포함되지 않았습니다.</p>
                </div>
            </div>
            
            <!-- 09. 품질 및 성과관리 - 사업관리 방안 (Slide 64) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">09</span>
                    <h2>품질 및 성과관리</h2>
                </div>
                
                <div class="quality-intro">체계적인 품질관리 시스템을 통해 프로젝트 수행 품질을 보장합니다</div>
                
                <div class="quality-grid">
                    <div class="quality-card">
                        <div class="quality-icon">📋</div>
                        <div class="quality-title">산출물 표준화</div>
                        <div class="quality-desc">모든 산출물의 형식, 내용, 품질 기준을 표준화하여 일관성 유지</div>
                        <ul class="quality-items">
                            <li>산출물 템플릿 제공</li>
                            <li>작성 가이드 및 체크리스트</li>
                            <li>버전 관리 체계</li>
                        </ul>
                    </div>
                    <div class="quality-card">
                        <div class="quality-icon">✅</div>
                        <div class="quality-title">품질 검토</div>
                        <div class="quality-desc">단계별 품질 검토 및 승인 프로세스 운영</div>
                        <ul class="quality-items">
                            <li>자체 QA 검토</li>
                            <li>고객 리뷰 및 승인</li>
                            <li>품질 개선 피드백</li>
                        </ul>
                    </div>
                    <div class="quality-card">
                        <div class="quality-icon">📊</div>
                        <div class="quality-title">성과 측정</div>
                        <div class="quality-desc">KPI 기반 프로젝트 성과 모니터링</div>
                        <ul class="quality-items">
                            <li>일정 준수율</li>
                            <li>결함 발생률</li>
                            <li>고객 만족도</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- 09. 품질 및 성과관리 - 업무보고 방안 (Slide 67) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">09</span>
                    <h2>업무보고 방안</h2>
                </div>
                
                <div class="report-subtitle">체계적인 보고 체계를 통해 프로젝트 투명성과 소통 효율을 극대화합니다</div>
                
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>유형</th>
                            <th>목적</th>
                            <th>참석자</th>
                            <th>주기</th>
                            <th>산출물</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>일일 보고</strong></td>
                            <td>업무 진행 현황 공유</td>
                            <td>실무진</td>
                            <td>매일</td>
                            <td>일일 리포트 (메신저)</td>
                        </tr>
                        <tr>
                            <td><strong>주간 보고</strong></td>
                            <td>주요 이슈 및 진행 상황 점검</td>
                            <td>PM + 파트별 리더</td>
                            <td>주 1회</td>
                            <td>주간 보고서</td>
                        </tr>
                        <tr>
                            <td><strong>월간 보고</strong></td>
                            <td>목표 대비 진행률, 리스크 관리</td>
                            <td>전체 팀 + 고객</td>
                            <td>월 1회</td>
                            <td>월간 보고서</td>
                        </tr>
                        <tr>
                            <td><strong>단계별 보고</strong></td>
                            <td>마일스톤 완료 및 승인</td>
                            <td>전체 + 고객 경영진</td>
                            <td>단계 완료 시</td>
                            <td>산출물 + 보고서</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- 09. 품질 및 성과관리 - 긴급이슈 대응 (Slide 68) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">09</span>
                    <h2>긴급이슈 대응 프로세스</h2>
                </div>
                
                <div class="emergency-intro">예기치 못한 이슈 발생 시 신속하고 체계적인 대응 체계를 운영합니다</div>
                
                <div class="emergency-process">
                    <div class="emergency-step">
                        <div class="emergency-step-num">1</div>
                        <div class="emergency-step-content">
                            <div class="emergency-title">이슈 발견</div>
                            <div class="emergency-desc">담당자가 이슈를 인지하고 PM에게 즉시 보고</div>
                            <div class="emergency-time">⏱️ 10분 이내</div>
                        </div>
                    </div>
                    <div class="emergency-arrow">→</div>
                    <div class="emergency-step">
                        <div class="emergency-step-num">2</div>
                        <div class="emergency-step-content">
                            <div class="emergency-title">긴급 판단</div>
                            <div class="emergency-desc">PM이 이슈 심각도를 판단하고 긴급 여부 결정</div>
                            <div class="emergency-time">⏱️ 30분 이내</div>
                        </div>
                    </div>
                    <div class="emergency-arrow">→</div>
                    <div class="emergency-step">
                        <div class="emergency-step-num">3</div>
                        <div class="emergency-step-content">
                            <div class="emergency-title">대응 조치</div>
                            <div class="emergency-desc">원인 분석 및 해결 방안 수립, 실행</div>
                            <div class="emergency-time">⏱️ 2시간 이내</div>
                        </div>
                    </div>
                    <div class="emergency-arrow">→</div>
                    <div class="emergency-step">
                        <div class="emergency-step-num">4</div>
                        <div class="emergency-step-content">
                            <div class="emergency-title">결과 보고</div>
                            <div class="emergency-desc">해결 결과 고객 보고 및 재발 방지책 공유</div>
                            <div class="emergency-time">⏱️ 4시간 이내</div>
                        </div>
                    </div>
                </div>
                
                <div class="emergency-note">
                    <p>※ 서비스 장애 등 심각한 이슈의 경우, 24시간 비상 연락 체계를 통해 즉시 대응합니다.</p>
                </div>
            </div>
            
            <!-- 09. 품질 및 성과관리 - 품질관리 자동화 (Slide 69) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">09</span>
                    <h2>품질관리 자동화</h2>
                </div>
                
                <div class="automation-subtitle">자동화된 품질 검증 시스템을 통해 일관된 품질을 보장합니다</div>
                
                <div class="automation-grid">
                    <div class="automation-card">
                        <div class="auto-icon">🔍</div>
                        <div class="auto-title">코드 품질 검사</div>
                        <ul class="auto-items">
                            <li>ESLint / Prettier 코드 스타일</li>
                            <li>SonarQube 정적 분석</li>
                            <li>코드 리뷰 자동화</li>
                        </ul>
                    </div>
                    <div class="automation-card">
                        <div class="auto-icon">🧪</div>
                        <div class="auto-title">테스트 자동화</div>
                        <ul class="auto-items">
                            <li>단위 테스트 (Jest, Mocha)</li>
                            <li>E2E 테스트 (Cypress, Playwright)</li>
                            <li>커버리지 80% 이상 유지</li>
                        </ul>
                    </div>
                    <div class="automation-card">
                        <div class="auto-icon">🚀</div>
                        <div class="auto-title">CI/CD 파이프라인</div>
                        <ul class="auto-items">
                            <li>GitHub Actions / Jenkins</li>
                            <li>빌드 / 테스트 / 배포 자동화</li>
                            <li>스테이징 / 프로덕션 분리</li>
                        </ul>
                    </div>
                    <div class="automation-card">
                        <div class="auto-icon">📈</div>
                        <div class="auto-title">모니터링</div>
                        <ul class="auto-items">
                            <li>Sentry 에러 추적</li>
                            <li>성능 모니터링 (Lighthouse)</li>
                            <li>실시간 알림 시스템</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- WE ARE 구분선 -->
            <div class="proposal-divider weare">
                <span class="divider-label">WE ARE</span>
                <div class="divider-sections">
                    <span>10 회사 소개</span>
                </div>
            </div>
            
            <!-- 10. 회사 소개 (Slide 21) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">10</span>
                    <h2>회사 소개</h2>
                </div>
                
                <div class="company-intro-new">
                    <h3>Agency Brain</h3>
                    <p>디지털 에이전시로서 다년간의 프로젝트 경험과 전문 인력을 바탕으로 최상의 결과물을 제공합니다.</p>
                </div>
                
                <div class="capability-grid">
                    <div class="capability-card"><div class="capability-number">100+</div><div class="capability-label">프로젝트 수행</div></div>
                    <div class="capability-card"><div class="capability-number">50+</div><div class="capability-label">전문 인력</div></div>
                    <div class="capability-card"><div class="capability-number">95%</div><div class="capability-label">고객 만족도</div></div>
                    <div class="capability-card"><div class="capability-number">10+</div><div class="capability-label">수상 경력</div></div>
                </div>
                
                <h3>유사 프로젝트 수행 경험</h3>
                <div class="portfolio-grid">
                    ${ind.competitors.slice(0, 3).map((comp, i) => `
                    <div class="portfolio-card">
                        <div class="portfolio-image" style="background: linear-gradient(135deg, ${['#667eea, #764ba2', '#f093fb, #f5576c', '#4facfe, #00f2fe'][i]})">
                            <span>${industryName} 프로젝트</span>
                        </div>
                        <div class="portfolio-info">
                            <div class="portfolio-title">${industryName} ${String.fromCharCode(65 + i)}사 플랫폼</div>
                            <div class="portfolio-desc">UX/UI 기획, 디자인, 개발</div>
                            <div class="portfolio-tags"><span>${platforms[0] || 'Web'}</span><span>AI</span></div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- 마무리 (Slide 22) -->
            <div class="proposal-ending">
                <div class="ending-badge">One Platform, Smarter ${ind.keyword} Experience</div>
                <div class="ending-message">
                    <h2>감사합니다</h2>
                    <p>함께 성장할 기회를 기대합니다</p>
                </div>
                <table class="ending-info-table">
                    <tr><td>클라이언트</td><td>${industryName} 프로젝트</td></tr>
                    <tr><td>제안유형</td><td>UX/UI 및 AI를 포함한 전체 기획 및 개발</td></tr>
                    <tr><td>제출일</td><td>${year}. ${String(month).padStart(2, '0')}. ${String(day).padStart(2, '0')}</td></tr>
                </table>
                <div class="ending-company">AGENCY BRAIN</div>
                <div class="ending-copyright">Copyright © ${year} Agency Brain. All rights reserved.</div>
            </div>
        `;
    }
    
    // 기능별 설명 생성
    function getFeatureDescription(feature) {
        const descriptions = {
            '회원가입/로그인': '이메일, 소셜 로그인 등 다양한 방식의 회원 인증 시스템',
            '소셜로그인': '카카오, 네이버, 구글 등 소셜 계정 연동 로그인',
            '상품검색': 'AI 기반 스마트 검색 및 필터링 기능',
            '장바구니': '실시간 동기화 및 임시저장 기능이 포함된 장바구니',
            '결제': 'PG사 연동 및 다양한 결제 수단 지원',
            '배송조회': '실시간 배송 현황 추적 및 알림 서비스',
            '리뷰': '사진/영상 리뷰 및 평점 시스템',
            'AI 챗봇': '24시간 자동 응대 AI 채팅 상담',
            '마이페이지': '개인화된 대시보드 및 설정 관리',
            '고객센터': 'FAQ, 1:1 문의, 공지사항 통합 관리'
        };
        return descriptions[feature] || '사용자 경험 향상을 위한 핵심 기능';
    }
    
    // 기능별 아이콘 매핑
    function getFeatureIcon(feature) {
        const iconMap = {
            '회원가입': '👤', '로그인': '🔐', '회원가입/로그인': '👤', '소셜로그인': '🔗',
            '상품검색': '🔍', '검색': '🔍', '장바구니': '🛒', '결제': '💳',
            '배송조회': '🚚', '배송': '📦', '리뷰': '⭐', '위시리스트': '❤️',
            '적립금': '💰', '쿠폰': '🎟️', '적립금/쿠폰': '🎁', '포인트': '💎',
            '이벤트': '🎉', '멤버십': '👑', 'AI': '🤖', '챗봇': '💬',
            '예약': '📅', '알림': '🔔', '마이페이지': '📱', '고객센터': '📞',
            '커뮤니티': '👥', '게시판': '📝', '메시지': '✉️', '공지사항': '📢'
        };
        
        for (const [key, icon] of Object.entries(iconMap)) {
            if (feature.includes(key)) return icon;
        }
        return '✨';
    }
    
    // HTML 다운로드 - 전문적인 제안서 스타일
    function downloadAsHTML(content, filename) {
        const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename}</title>
    <style>
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 1000px; margin: 0 auto; padding: 40px; background: #f8fafc; }
        
        /* 표지 */
        .proposal-cover-page { text-align: center; padding: 80px 40px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); border-radius: 16px; margin-bottom: 40px; color: white; page-break-after: always; }
        .cover-badge { display: inline-block; padding: 10px 30px; background: rgba(0, 217, 255, 0.2); border: 1px solid rgba(0, 217, 255, 0.3); border-radius: 30px; font-size: 12px; letter-spacing: 4px; color: #00D9FF; margin-bottom: 40px; }
        .cover-title { font-size: 36px; font-weight: 700; line-height: 1.3; margin-bottom: 20px; color: white; }
        .cover-subtitle { font-size: 18px; color: rgba(255,255,255,0.7); margin-bottom: 50px; }
        .cover-meta { display: flex; justify-content: center; gap: 50px; color: rgba(255,255,255,0.5); font-size: 14px; }
        
        /* 섹션 */
        .proposal-section { margin-bottom: 40px; padding: 30px; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); page-break-inside: avoid; }
        .section-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #00D9FF; }
        .section-num { font-size: 28px; font-weight: 700; color: #00D9FF; opacity: 0.5; }
        .section-header h2 { font-size: 20px; color: #1a1a2e; margin: 0; }
        h3 { font-size: 16px; margin: 24px 0 16px; color: #1a1a2e; padding-left: 12px; border-left: 3px solid #00D9FF; }
        p { color: #555; line-height: 1.8; margin-bottom: 16px; }
        
        /* 목차 */
        .toc-section { background: #f1f5f9; }
        .toc-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .toc-item { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: white; border-radius: 8px; }
        .toc-num { font-size: 12px; font-weight: 700; color: #00D9FF; min-width: 28px; }
        .toc-title { font-size: 14px; color: #1a1a2e; }
        
        /* 개요 그리드 */
        .overview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .overview-item { background: #f8fafc; border-radius: 8px; padding: 20px; border-left: 3px solid #00D9FF; }
        .overview-label { font-size: 12px; color: #888; margin-bottom: 8px; }
        .overview-value { font-size: 15px; font-weight: 600; color: #1a1a2e; }
        
        /* 분석 카드 */
        .analysis-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
        .analysis-card { background: #f8fafc; border-radius: 12px; padding: 24px; }
        .analysis-card.negative { border-top: 3px solid #FF6B9D; }
        .analysis-card.positive { border-top: 3px solid #2ED573; }
        .analysis-icon { font-size: 32px; margin-bottom: 12px; }
        .analysis-title { font-weight: 700; margin-bottom: 16px; color: #1a1a2e; }
        .analysis-list { list-style: none; padding: 0; }
        .analysis-list li { padding: 8px 0 8px 20px; position: relative; color: #555; font-size: 14px; }
        .analysis-list li::before { content: '•'; position: absolute; left: 0; color: #00D9FF; }
        
        /* 전략 */
        .strategy-main { text-align: center; padding: 50px 30px; background: linear-gradient(135deg, rgba(123, 97, 255, 0.1) 0%, rgba(0, 217, 255, 0.1) 100%); border-radius: 12px; margin-bottom: 30px; }
        .strategy-keyword { font-size: 40px; font-weight: 700; color: #00D9FF; margin-bottom: 16px; }
        .strategy-slogan { font-size: 16px; color: #555; line-height: 1.6; }
        .strategy-pillars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .pillar { text-align: center; padding: 30px 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; }
        .pillar-icon { font-size: 32px; margin-bottom: 16px; }
        .pillar-title { font-weight: 700; color: #00D9FF; margin-bottom: 8px; font-size: 14px; }
        .pillar-desc { font-size: 12px; color: #888; line-height: 1.5; }
        
        /* 기능 */
        .feature-detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .feature-detail-card { padding: 24px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; }
        .feature-detail-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .feature-detail-icon { font-size: 24px; }
        .feature-detail-num { font-size: 12px; color: #888; font-weight: 600; }
        .feature-detail-title { font-weight: 700; margin-bottom: 8px; color: #1a1a2e; }
        .feature-detail-desc { font-size: 13px; color: #555; margin-bottom: 12px; line-height: 1.6; }
        .feature-detail-points .point { display: block; font-size: 11px; color: #888; }
        
        /* 테이블 */
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 14px 16px; text-align: left; border: 1px solid #e2e8f0; font-size: 14px; }
        th { background: #f1f5f9; font-weight: 600; color: #1a1a2e; }
        td { color: #555; }
        td.amount, .total-amount { text-align: right; font-weight: 600; color: #1a1a2e; }
        tfoot td { background: rgba(0, 217, 255, 0.1); font-weight: 700; }
        .total-label { text-align: right; }
        .total-amount { font-size: 18px; color: #00D9FF; }
        
        /* 조직도 */
        .org-chart { padding: 30px; background: #f8fafc; border-radius: 12px; }
        .org-pm { display: flex; justify-content: center; margin-bottom: 30px; }
        .org-card { text-align: center; padding: 20px 24px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; min-width: 120px; }
        .org-card.pm { border-color: #00D9FF; background: rgba(0, 217, 255, 0.1); }
        .org-icon { font-size: 28px; margin-bottom: 8px; }
        .org-role { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
        .org-count { font-size: 18px; color: #00D9FF; font-weight: 600; margin-bottom: 4px; }
        .org-desc { font-size: 11px; color: #888; }
        .org-teams { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
        .team-total { display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 24px; padding-top: 24px; border-top: 1px solid #e2e8f0; }
        .team-total-count { font-size: 24px; font-weight: 700; color: #00D9FF; }
        
        /* 역량 */
        .capability-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px; }
        .capability-card { text-align: center; padding: 30px 20px; background: linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(123, 97, 255, 0.1) 100%); border-radius: 12px; }
        .capability-number { font-size: 36px; font-weight: 700; color: #00D9FF; }
        .capability-label { font-size: 13px; color: #555; margin-top: 8px; }
        
        /* 마무리 */
        .proposal-ending { text-align: center; padding: 60px 30px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); border-radius: 16px; margin-top: 40px; color: white; }
        .ending-message h2 { font-size: 28px; margin-bottom: 16px; color: white; }
        .ending-message p { color: rgba(255,255,255,0.7); margin-bottom: 40px; }
        .contact-info { display: flex; justify-content: center; gap: 50px; }
        .contact-item { text-align: left; }
        .contact-label { display: block; font-size: 12px; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
        .contact-value { color: #00D9FF; font-weight: 500; }
        
        /* 인쇄 스타일 */
        @media print {
            body { max-width: 100%; padding: 20px; background: white; }
            .proposal-section { box-shadow: none; border: 1px solid #e2e8f0; }
            .proposal-cover-page { page-break-after: always; }
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
        
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Word 다운로드 (HTML 기반) - 전문적인 제안서 스타일
    function downloadAsWord(content, filename) {
        const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>${filename}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
</w:WordDocument>
</xml>
<![endif]-->
<style>
@page { size: A4; margin: 2cm; }
body { font-family: '맑은 고딕', 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
h1 { font-size: 28pt; color: #1a1a2e; text-align: center; margin-bottom: 20pt; }
h2 { font-size: 16pt; color: #0891b2; border-bottom: 2pt solid #0891b2; padding-bottom: 8pt; margin-top: 30pt; margin-bottom: 15pt; }
h3 { font-size: 12pt; color: #1a1a2e; margin-top: 20pt; margin-bottom: 10pt; border-left: 3pt solid #0891b2; padding-left: 10pt; }
p { font-size: 10pt; margin-bottom: 10pt; color: #444; }
table { width: 100%; border-collapse: collapse; margin: 15pt 0; }
th, td { padding: 10pt 12pt; border: 1pt solid #ddd; font-size: 10pt; }
th { background: #f0f0f0; font-weight: bold; }
ul { margin: 10pt 0; padding-left: 20pt; }
li { margin: 6pt 0; font-size: 10pt; }
.cover { text-align: center; padding: 100pt 0; page-break-after: always; }
.cover h1 { font-size: 36pt; margin-bottom: 15pt; }
.cover .subtitle { font-size: 14pt; color: #666; margin-bottom: 50pt; }
.section-num { font-size: 18pt; color: #0891b2; font-weight: bold; margin-right: 10pt; }
.highlight { color: #0891b2; font-weight: bold; }
.amount { text-align: right; font-weight: bold; }
.total { background: #e6f7ff; font-weight: bold; font-size: 12pt; }
</style>
</head>
<body>
${content}
</body>
</html>`;
        
        const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // 폼 제출 이벤트
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const placeholder = resultCard.querySelector('.result-placeholder');
        const content = resultCard.querySelector('.result-content');
        const proposalContent = document.getElementById('proposalContent');
        
        // 입력값 수집
        const industry = industrySelect?.value || '';
        const industryName = industryNames[industry] || '일반';
        const target = document.getElementById('target')?.value || '';
        const platforms = Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(cb => platformNames[cb.value] || cb.value);
        const budgetMin = document.getElementById('budgetMin')?.value || '3000';
        const budgetMax = document.getElementById('budgetMax')?.value || '5000';
        const features = Array.from(document.querySelectorAll('input[name="feature"]:checked')).map(cb => cb.value);
        
        // 로딩 상태
        placeholder.innerHTML = `
            <div class="placeholder-icon loading">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
            </div>
            <h3>AI 제안서 생성 중...</h3>
            <p>입력하신 정보를 바탕으로 맞춤형 제안서를 생성하고 있습니다.<br>잠시만 기다려주세요.</p>
        `;
        placeholder.style.display = 'flex';
        content.style.display = 'none';
        
        // 제안서 생성
        setTimeout(() => {
            const proposalHTML = generateProposal({
                industry, industryName, target, platforms, budgetMin, budgetMax, features
            });
            
            proposalContent.innerHTML = proposalHTML;
            placeholder.style.display = 'none';
            content.style.display = 'block';
            content.style.animation = 'fadeIn 0.5s ease';
            
            // 다운로드 버튼 이벤트
            document.getElementById('downloadHTML')?.addEventListener('click', () => {
                downloadAsHTML(proposalHTML, `${industryName}_제안서_${new Date().toISOString().split('T')[0]}`);
            });
            
            document.getElementById('downloadWord')?.addEventListener('click', () => {
                downloadAsWord(proposalHTML, `${industryName}_제안서_${new Date().toISOString().split('T')[0]}`);
            });
            
            document.getElementById('copyProposal')?.addEventListener('click', () => {
                const textContent = proposalContent.innerText;
                navigator.clipboard.writeText(textContent).then(() => {
                    alert('제안서 내용이 클립보드에 복사되었습니다.');
                });
            });
        }, 2000);
    });
}

// ============================================
// Estimate Form
// ============================================

function initEstimateForm() {
    const form = document.getElementById('estimateForm');
    const resultCard = document.getElementById('estimateResult');
    const industrySelect = document.getElementById('estimateIndustry');
    const featuresContainer = document.getElementById('estimateFeatures');
    const platformSelectAll = document.getElementById('estimatePlatformSelectAll');
    const featureSelectAll = document.getElementById('estimateFeatureSelectAll');
    
    // 업종별 필수 기능 데이터
    const estimateFeatures = {
        fashion: ['회원가입/로그인', '소셜로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', '위시리스트', '사이즈가이드', '코디추천', '반응형', '관리자페이지'],
        beauty: ['회원가입/로그인', '소셜로그인', '상품검색', '장바구니', '결제', 'AI 피부진단', '정기구독', '리뷰', '멤버십', '맞춤추천', '반응형', '관리자페이지'],
        fnb: ['회원가입/로그인', '상품검색', '장바구니', '결제', '정기배송', '영양정보', '레시피', '리뷰', '매장찾기', '반응형', '관리자페이지'],
        electronics: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', 'A/S신청', '스펙비교', '리뷰', '설치예약', '반응형', '관리자페이지'],
        furniture: ['회원가입/로그인', '상품검색', '장바구니', '결제', '3D뷰어', 'AR배치', '리뷰', '설치예약', '인테리어상담', '반응형', '관리자페이지'],
        sports: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', '커뮤니티', '운동기록', '챌린지', '멤버십', '반응형', '관리자페이지'],
        kids: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', '육아정보', '성장기록', '안전인증', '리뷰', '반응형', '관리자페이지'],
        pets: ['회원가입/로그인', '상품검색', '장바구니', '결제', '정기배송', '건강기록', '수의사상담', '커뮤니티', '리뷰', '반응형', '관리자페이지'],
        luxury: ['회원가입/로그인', 'VIP인증', '상품검색', '장바구니', '결제', '정품인증', '컨시어지', 'VIP서비스', '예약방문', '반응형', '관리자페이지'],
        healthcare: ['회원가입/로그인', '본인인증', '진료예약', '의료진검색', '진료기록', '처방전', '화상진료', '건강검진', '결제', '반응형', '관리자페이지'],
        education: ['회원가입/로그인', '강좌검색', '수강신청', '결제', '온라인강의', '실시간수업', '과제제출', '성적조회', '수료증', '반응형', '관리자페이지'],
        finance: ['회원가입/로그인', '본인인증', '계좌연결', '상품조회', '신청/가입', '자산관리', '거래내역', '이체', '보안인증', '반응형', '관리자페이지'],
        travel: ['회원가입/로그인', '여행상품검색', '항공예약', '호텔예약', '결제', '일정관리', '리뷰', '마일리지', '보험', '반응형', '관리자페이지'],
        realestate: ['회원가입/로그인', '매물검색', '지도검색', '방문예약', '중개사상담', '시세정보', '3D투어', '계약관리', '반응형', '관리자페이지'],
        restaurant: ['회원가입/로그인', '매장검색', '메뉴검색', '예약', '웨이팅', '결제', '포인트', '리뷰', '테이크아웃', '반응형', '관리자페이지'],
        fitness: ['회원가입/로그인', '수업예약', '회원권관리', 'PT예약', '운동기록', '출석체크', '락커관리', '커뮤니티', '결제', '반응형', '관리자페이지'],
        salon: ['회원가입/로그인', '스타일검색', '예약', '디자이너선택', '결제', '포인트', '리뷰', '포트폴리오', '반응형', '관리자페이지'],
        media: ['회원가입/로그인', '기사검색', '구독', '댓글', '북마크', '공유', '맞춤뉴스', '프리미엄', '결제', '반응형', '관리자페이지'],
        entertainment: ['회원가입/로그인', '콘텐츠검색', '시청/청취', '구독', '좋아요', '플레이리스트', '굿즈샵', '결제', '반응형', '관리자페이지'],
        ott: ['회원가입/로그인', '콘텐츠검색', '시청', '구독결제', '프로필관리', '찜목록', '다운로드', '추천', '반응형', '관리자페이지'],
        community: ['회원가입/로그인', '게시글작성', '댓글', '좋아요', '팔로우', '메시지', '알림', '검색', '신고', '반응형', '관리자페이지'],
        public: ['회원가입/로그인', '본인인증', '민원신청', '서류발급', '예약', '공지사항', '챗봇', 'FAQ', '반응형', '관리자페이지'],
        nonprofit: ['회원가입/로그인', '후원하기', '정기후원', '캠페인', '봉사신청', '증명서발급', '뉴스레터', '반응형', '관리자페이지'],
        association: ['회원가입/로그인', '회원가입신청', '회비납부', '행사신청', '자료실', '온라인투표', '커뮤니티', '반응형', '관리자페이지'],
        b2b_commerce: ['회원가입/로그인', '기업인증', '상품검색', 'RFQ요청', '견적서', '주문', '결제', '재고관리', '정산', '반응형', '관리자페이지'],
        saas: ['회원가입/로그인', '서비스소개', '요금제', '무료체험', '결제', '대시보드', '팀관리', 'API', '반응형', '관리자페이지'],
        manufacturing: ['회원가입/로그인', '제품카탈로그', '견적요청', '주문', '생산현황', '품질관리', '물류추적', '정산', '반응형', '관리자페이지']
    };
    
    // 기능 체크박스 업데이트
    function updateEstimateFeatures() {
        const selectedIndustry = industrySelect?.value;
        if (!featuresContainer) return;
        
        let features = estimateFeatures[selectedIndustry] || ['회원가입/로그인', '소셜로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', '반응형', '관리자페이지'];
        
        featuresContainer.innerHTML = features.map(feature => `
            <label class="checkbox-item">
                <input type="checkbox" name="est_feature" value="${feature}">
                <span class="checkmark"></span>
                <span>${feature}</span>
            </label>
        `).join('');
        
        if (featureSelectAll) featureSelectAll.checked = false;
        initEstimateFeatureEvents();
    }
    
    // 기능 체크박스 이벤트
    function initEstimateFeatureEvents() {
        const featureCheckboxes = featuresContainer?.querySelectorAll('input[name="est_feature"]');
        featureCheckboxes?.forEach(cb => {
            cb.addEventListener('change', () => updateEstimateSelectAllState('feature'));
        });
    }
    
    // 전체선택 상태 업데이트
    function updateEstimateSelectAllState(type) {
        if (type === 'platform') {
            const checkboxes = document.querySelectorAll('input[name="est_platform"]');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            if (platformSelectAll) platformSelectAll.checked = allChecked;
        } else if (type === 'feature') {
            const checkboxes = document.querySelectorAll('input[name="est_feature"]');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            if (featureSelectAll) featureSelectAll.checked = allChecked;
        }
    }
    
    // 플랫폼 전체선택
    platformSelectAll?.addEventListener('change', (e) => {
        document.querySelectorAll('input[name="est_platform"]').forEach(cb => cb.checked = e.target.checked);
    });
    
    // 기능 전체선택
    featureSelectAll?.addEventListener('change', (e) => {
        document.querySelectorAll('input[name="est_feature"]').forEach(cb => cb.checked = e.target.checked);
    });
    
    // 플랫폼 개별 체크박스
    document.querySelectorAll('input[name="est_platform"]').forEach(cb => {
        cb.addEventListener('change', () => updateEstimateSelectAllState('platform'));
    });
    
    // 업종 변경 이벤트
    industrySelect?.addEventListener('change', updateEstimateFeatures);
    
    // 초기 기능 체크박스 생성
    updateEstimateFeatures();
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 선택된 값 가져오기
        const industry = industrySelect?.value || 'default';
        const selectedPlatforms = Array.from(document.querySelectorAll('input[name="est_platform"]:checked')).map(cb => cb.value);
        const selectedFeatures = Array.from(document.querySelectorAll('input[name="est_feature"]:checked')).map(cb => cb.value);
        
        // 업종별 복잡도 계수
        const industryComplexity = {
            fashion: 1.2, beauty: 1.1, fnb: 1.0, electronics: 1.3, furniture: 1.2, 
            healthcare: 1.4, education: 1.3, finance: 1.5, travel: 1.3, realestate: 1.2,
            restaurant: 1.0, fitness: 1.1, salon: 1.0, media: 1.2, entertainment: 1.3,
            ott: 1.4, community: 1.1, public: 1.3, nonprofit: 1.1, association: 1.1,
            b2b_commerce: 1.4, saas: 1.5, manufacturing: 1.3, default: 1.2
        };
        const complexity = industryComplexity[industry] || 1.2;
        
        // 플랫폼별 비용
        const platformCosts = {
            shopify: 1800, cafe24: 1450, magento: 2700, woocommerce: 1600,
            godo: 1450, makeshop: 1400, wordpress: 1500, webflow: 1300,
            react: 3200, vue: 3100, flutter: 3500, reactnative: 3300,
            ios: 4100, android: 3700, custom: 3800
        };
        
        // 기능별 비용
        const featureCosts = {
            '회원가입/로그인': 450, '소셜로그인': 250, '본인인증': 400, '상품검색': 480,
            '장바구니': 390, '결제': 680, '배송조회': 290, '리뷰': 430, '위시리스트': 250,
            '정기배송': 580, '정기구독': 580, '사이즈가이드': 200, '코디추천': 350,
            'AI 피부진단': 1200, '멤버십': 450, '맞춤추천': 600, 'AI추천': 1050,
            '영양정보': 200, '레시피': 300, '매장찾기': 350, 'A/S신청': 380,
            '스펙비교': 420, '설치예약': 350, '3D뷰어': 800, 'AR배치': 1500,
            '인테리어상담': 450, '운동기록': 350, '챌린지': 400, '육아정보': 300,
            '성장기록': 350, '안전인증': 200, '건강기록': 380, '수의사상담': 550,
            'VIP인증': 350, 'VIP서비스': 600, '정품인증': 450, '컨시어지': 700,
            '예약방문': 380, '진료예약': 480, '의료진검색': 350, '진료기록': 450,
            '처방전': 400, '화상진료': 800, '건강검진': 450, '강좌검색': 380,
            '수강신청': 420, '온라인강의': 850, '실시간수업': 950, '과제제출': 350,
            '성적조회': 300, '수료증': 250, '계좌연결': 600, '상품조회': 380,
            '신청/가입': 450, '자산관리': 750, '거래내역': 400, '이체': 650,
            '보안인증': 500, '여행상품검색': 450, '항공예약': 600, '호텔예약': 550,
            '일정관리': 400, '마일리지': 350, '보험': 500, '매물검색': 500,
            '지도검색': 450, '방문예약': 380, '중개사상담': 450, '시세정보': 350,
            '3D투어': 900, '계약관리': 550, '메뉴검색': 300, '예약': 480,
            '웨이팅': 400, '포인트': 380, '테이크아웃': 350, '수업예약': 420,
            '회원권관리': 450, 'PT예약': 380, '출석체크': 250, '락커관리': 300,
            '스타일검색': 350, '디자이너선택': 300, '포트폴리오': 350,
            '기사검색': 320, '구독': 450, '댓글': 250, '북마크': 180,
            '공유': 150, '맞춤뉴스': 500, '프리미엄': 550, '콘텐츠검색': 380,
            '시청/청취': 600, '시청': 550, '구독결제': 500, '좋아요': 180,
            '플레이리스트': 350, '프로필관리': 300, '찜목록': 250, '다운로드': 400,
            '추천': 550, '게시글작성': 350, '팔로우': 280, '메시지': 500,
            '알림': 350, '검색': 300, '신고': 250, '민원신청': 500,
            '서류발급': 450, '공지사항': 200, '챗봇': 900, 'FAQ': 200,
            '후원하기': 450, '정기후원': 500, '캠페인': 400, '봉사신청': 380,
            '증명서발급': 350, '뉴스레터': 280, '회원가입신청': 350,
            '회비납부': 400, '행사신청': 350, '자료실': 300, '온라인투표': 500,
            '기업인증': 450, 'RFQ요청': 500, '견적서': 450, '주문': 480,
            '재고관리': 550, '정산': 500, '서비스소개': 250, '요금제': 300,
            '무료체험': 350, '대시보드': 600, '팀관리': 450, 'API': 700,
            '제품카탈로그': 400, '견적요청': 450, '생산현황': 500, '품질관리': 450,
            '물류추적': 500, '커뮤니티': 550, '반응형': 300, '관리자페이지': 800,
            default: 350
        };
        
        // 견적 계산
        let platformTotal = 0;
        selectedPlatforms.forEach(p => {
            platformTotal += platformCosts[p] || 1500;
        });
        
        let featureTotal = 0;
        selectedFeatures.forEach(f => {
            featureTotal += featureCosts[f] || featureCosts.default;
        });
        
        // 총 견적 (복잡도 적용)
        const baseEstimate = Math.round((platformTotal + featureTotal) * complexity);
        const minEstimate = Math.round(baseEstimate * 0.85);
        const maxEstimate = Math.round(baseEstimate * 1.15);
        
        // 예상 기간 계산
        const featureCount = selectedFeatures.length;
        const platformCount = selectedPlatforms.length;
        const baseWeeks = Math.max(6, Math.ceil(featureCount / 2) + platformCount);
        const minWeeks = Math.max(4, baseWeeks - 1);
        const maxWeeks = baseWeeks + 2;
        
        // UI 업데이트
        if (resultCard) {
            resultCard.style.animation = 'none';
            resultCard.offsetHeight;
            resultCard.style.animation = 'fadeIn 0.5s ease';
            
            // 견적 금액 업데이트
            const valueEl = resultCard.querySelector('.main-estimate .value');
            const rangeEl = resultCard.querySelector('.main-estimate .range');
            if (valueEl) valueEl.textContent = baseEstimate.toLocaleString();
            if (rangeEl) rangeEl.textContent = `범위: ${minEstimate.toLocaleString()} ~ ${maxEstimate.toLocaleString()} 만원 (±15%)`;
            
            // 게이지 업데이트
            const gaugeFill = resultCard.querySelector('.gauge-fill');
            const gaugeMarker = resultCard.querySelector('.gauge-marker');
            const gaugeMin = resultCard.querySelector('.gauge-min');
            const gaugeValue = resultCard.querySelector('.gauge-value');
            const gaugeMax = resultCard.querySelector('.gauge-max');
            
            if (gaugeFill && gaugeMarker) {
                gaugeFill.style.transition = 'width 1s ease';
                gaugeMarker.style.transition = 'left 1s ease';
                
                // 게이지 범위 설정 (0~10000 기준)
                const gaugeMinVal = Math.max(0, baseEstimate - 2000);
                const gaugeMaxVal = baseEstimate + 2000;
                const gaugePercent = Math.min(100, Math.max(0, ((baseEstimate - gaugeMinVal) / (gaugeMaxVal - gaugeMinVal)) * 100));
                
                gaugeFill.style.width = `${gaugePercent}%`;
                gaugeMarker.style.left = `${gaugePercent}%`;
                
                if (gaugeMin) gaugeMin.textContent = gaugeMinVal.toLocaleString();
                if (gaugeValue) gaugeValue.textContent = baseEstimate.toLocaleString();
                if (gaugeMax) gaugeMax.textContent = gaugeMaxVal.toLocaleString();
            }
            
            // 게이지 라벨 업데이트
            const gaugeLabels = resultCard.querySelectorAll('.gauge-labels span');
            if (gaugeLabels.length >= 3) {
                const gaugeMinVal = Math.max(0, baseEstimate - 2000);
                const gaugeMaxVal = baseEstimate + 2000;
                gaugeLabels[0].textContent = gaugeMinVal.toLocaleString();
                gaugeLabels[1].textContent = baseEstimate.toLocaleString();
                gaugeLabels[2].textContent = gaugeMaxVal.toLocaleString();
            }
            
            // 산출 근거 업데이트
            const breakdownItems = resultCard.querySelectorAll('.breakdown-item');
            const industryNames = {
                fashion: '패션', beauty: '뷰티', fnb: 'F&B', electronics: '가전',
                furniture: '가구', healthcare: '의료', education: '교육', finance: '금융',
                travel: '여행', realestate: '부동산', restaurant: '음식점', fitness: '피트니스',
                salon: '뷰티샵', media: '미디어', entertainment: '엔터테인먼트', ott: 'OTT',
                community: '커뮤니티', public: '공공기관', nonprofit: '비영리', association: '협회',
                b2b_commerce: 'B2B커머스', saas: 'SaaS', manufacturing: '제조'
            };
            const indName = industryNames[industry] || '일반';
            
            breakdownItems.forEach((item, idx) => {
                const valueSpan = item.querySelector('.breakdown-value');
                if (!valueSpan) return;
                
                if (idx === 0) {
                    valueSpan.textContent = `${indName} 업종 유사 프로젝트 분석`;
                } else if (idx === 1) {
                    valueSpan.textContent = `${baseEstimate.toLocaleString()}만원`;
                } else if (idx === 2) {
                    valueSpan.textContent = `${baseWeeks}주 (범위: ${minWeeks}~${maxWeeks}주)`;
                }
            });
            
            // 리스크 업데이트
            const riskContainer = resultCard.querySelector('.estimate-risk');
            if (riskContainer) {
                let riskHTML = '<h4>⚠️ 리스크 요인</h4>';
                const riskList = [];
                
                if (selectedPlatforms.includes('ios') || selectedPlatforms.includes('android')) {
                    riskList.push({ icon: '📱', title: '앱스토어 심사', desc: '1~2주 버퍼 권장' });
                }
                if (selectedFeatures.includes('결제')) {
                    riskList.push({ icon: '💳', title: 'PG 연동', desc: '1주 버퍼 권장' });
                }
                if (selectedFeatures.some(f => f.includes('AI'))) {
                    riskList.push({ icon: '🤖', title: 'AI 모델 연동', desc: '2주 버퍼 권장' });
                }
                if (selectedFeatures.includes('본인인증') || selectedFeatures.includes('보안인증')) {
                    riskList.push({ icon: '🔐', title: '인증 연동', desc: '1주 버퍼 권장' });
                }
                if (selectedFeatures.includes('계좌연결') || selectedFeatures.includes('이체')) {
                    riskList.push({ icon: '🏦', title: '금융 API 연동', desc: '2주 버퍼 권장' });
                }
                if (complexity >= 1.4) {
                    riskList.push({ icon: '⚠️', title: `높은 업종 복잡도 (${complexity}x)`, desc: '추가 검토 필요' });
                }
                if (selectedPlatforms.includes('magento')) {
                    riskList.push({ icon: '🔧', title: 'Magento 커스터마이징', desc: '2주 버퍼 권장' });
                }
                if (selectedPlatforms.includes('shopify')) {
                    riskList.push({ icon: '🔌', title: 'Shopify API 연동', desc: '1주 버퍼 권장' });
                }
                
                if (riskList.length === 0) {
                    riskList.push({ icon: '✅', title: '특별한 리스크 없음', desc: '표준 일정 적용' });
                }
                
                riskList.forEach(risk => {
                    riskHTML += `
                        <div class="risk-item">
                            <span class="risk-icon">${risk.icon}</span>
                            <div class="risk-content">
                                <span class="risk-title">${risk.title}</span>
                                <span class="risk-desc">${risk.desc}</span>
                            </div>
                        </div>`;
                });
                
                riskContainer.innerHTML = riskHTML;
            }
        }
    });
}

// ============================================
// IA Form
// ============================================

function initIAForm() {
    const form = document.getElementById('iaForm');
    const industrySelect = document.getElementById('iaIndustry');
    const siteTypeSelect = document.getElementById('iaSiteType');
    const featuresContainer = document.getElementById('iaFeatures');
    const iaTree = document.getElementById('iaTree');
    
    // 사이트 유형별 주요 기능 데이터
    const siteTypeFeatures = {
        shopping: ['회원가입/로그인', '상품검색', '카테고리', '장바구니', '결제', '배송조회', '리뷰', '위시리스트', '적립금/쿠폰', '이벤트'],
        brand: ['브랜드 소개', '제품 라인업', '브랜드 스토리', '매장 찾기', '뉴스/보도자료', '채용정보', '고객센터', 'SNS 연동', '뉴스레터', '회원가입'],
        corporate: ['회사소개', '사업영역', '연혁', '조직도', 'CI/BI', '보도자료', '채용정보', '오시는 길', '문의하기', '파트너사'],
        service: ['회원가입/로그인', '서비스 소개', '요금제', '신청/가입', '마이페이지', '결제', '고객센터', '공지사항', 'FAQ', '이용약관'],
        portal: ['회원가입/로그인', '게시판', '검색', '카테고리', '댓글', '좋아요', '팔로우', '알림', '메시지', '프로필'],
        booking: ['회원가입/로그인', '예약하기', '날짜/시간선택', '예약조회', '예약변경/취소', '결제', '리뷰', '알림', '마이페이지', '고객센터'],
        membership: ['회원가입/로그인', '멤버십 혜택', '회원등급', '포인트', '쿠폰', '마이페이지', '결제', '이벤트', '공지사항', '고객센터']
    };

    // 업종별 주요 기능 데이터
    const industryFeatures = {
        // 커머스
        fashion: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', '위시리스트', '적립금/쿠폰', '사이즈가이드', '코디추천'],
        beauty: ['회원가입/로그인', '상품검색', '장바구니', '결제', 'AI 피부진단', '리뷰', '정기구독', '적립금/쿠폰', '맞춤추천', '뷰티팁'],
        fnb: ['회원가입/로그인', '메뉴검색', '장바구니', '결제', '예약', '포인트', '리뷰', '매장찾기', '테이크아웃', '배달'],
        electronics: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', 'A/S신청', '리뷰', '스펙비교', '설치예약', '렌탈'],
        furniture: ['회원가입/로그인', '상품검색', '장바구니', '결제', '3D뷰어', 'AR배치', '리뷰', '인테리어상담', '설치예약', '맞춤제작'],
        sports: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', '커뮤니티', '운동기록', '챌린지', '멤버십'],
        kids: ['회원가입/로그인', '상품검색', '장바구니', '결제', '배송조회', '리뷰', '육아정보', '성장기록', '안전인증정보', '교환/반품'],
        pets: ['회원가입/로그인', '상품검색', '장바구니', '결제', '정기배송', '리뷰', '반려동물등록', '건강기록', '수의사상담', '커뮤니티'],
        luxury: ['회원가입/로그인', '상품검색', '장바구니', '결제', 'VIP서비스', '정품인증', '리뷰', '컨시어지', '예약방문', '멤버십'],
        // 서비스
        healthcare: ['회원가입/로그인', '진료예약', '의료진검색', '비용안내', '진료기록', '처방전', '건강검진', '원격상담', '병원안내', '리뷰'],
        education: ['회원가입/로그인', '강좌검색', '수강신청', '결제', '온라인강의', '과제제출', '성적조회', '출석관리', '질문게시판', '수료증'],
        travel: ['회원가입/로그인', '여행상품검색', '예약', '결제', '일정관리', '예약확인', '리뷰', '여행정보', '보험', '마일리지'],
        realestate: ['회원가입/로그인', '매물검색', '지도검색', '관심매물', '중개사상담', '방문예약', '계약관리', '시세정보', '대출상담', '입주관리'],
        finance: ['회원가입/로그인', '본인인증', '상품조회', '신청/가입', '자산관리', '거래내역', '이체', '대출', '보험', '투자'],
        restaurant: ['회원가입/로그인', '메뉴검색', '예약', '웨이팅', '결제', '포인트', '리뷰', '이벤트', '매장정보', '테이크아웃'],
        fitness: ['회원가입/로그인', '수업예약', '회원권관리', 'PT예약', '운동기록', '식단관리', '커뮤니티', '락커관리', '출석체크', '이벤트'],
        salon: ['회원가입/로그인', '스타일검색', '예약', '디자이너선택', '결제', '포인트', '리뷰', '포트폴리오', '상담', '이벤트'],
        consulting: ['회원가입/로그인', '서비스검색', '상담신청', '견적요청', '프로젝트관리', '결제', '문서관리', '일정관리', '화상회의', '리뷰'],
        recruitment: ['회원가입/로그인', '채용공고검색', '이력서관리', '지원하기', '면접일정', '합격결과', '기업정보', '연봉정보', '커리어상담', '알림'],
        // 미디어/콘텐츠
        media: ['회원가입/로그인', '기사검색', '카테고리', '구독', '댓글', '북마크', '공유', '알림', '맞춤뉴스', '프리미엄'],
        entertainment: ['회원가입/로그인', '콘텐츠검색', '시청/청취', '결제', '구독', '좋아요', '댓글', '플레이리스트', '추천', '굿즈샵'],
        ott: ['회원가입/로그인', '콘텐츠검색', '시청', '구독결제', '프로필관리', '찜목록', '다운로드', '시청기록', '추천', '자녀보호'],
        community: ['회원가입/로그인', '게시글작성', '댓글', '좋아요', '팔로우', '메시지', '알림', '검색', '신고', '프로필'],
        // 공공/기관
        public: ['회원가입/로그인', '민원신청', '서류발급', '예약', '공지사항', '정책정보', '기관검색', '전자결재', 'FAQ', '챗봇'],
        nonprofit: ['회원가입/로그인', '후원하기', '정기후원', '캠페인', '봉사신청', '활동소식', '증명서발급', '회원관리', '커뮤니티', '뉴스레터'],
        association: ['회원가입/로그인', '회원가입신청', '회비납부', '행사신청', '자료실', '공지사항', '회원검색', '온라인투표', '커뮤니티', '뉴스레터'],
        university: ['회원가입/로그인', '학사정보', '수강신청', '성적조회', '장학금', '도서관', '학생증', '증명서', '커뮤니티', '취업정보'],
        // B2B
        b2b_commerce: ['회원가입/로그인', '상품검색', 'RFQ요청', '견적서', '주문', '결제', '재고관리', '거래처관리', '통계', '정산'],
        saas: ['회원가입/로그인', '서비스소개', '요금제', '무료체험', '결제', '대시보드', '팀관리', 'API', '고객지원', '업데이트'],
        manufacturing: ['회원가입/로그인', '제품카탈로그', '견적요청', '주문', '생산현황', '품질관리', '물류추적', '정산', 'B2B마켓', '파트너관리']
    };

    // 사이트 유형별 IA 트리 데이터
    const siteTypeTreeData = {
        shopping: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🛍️', label: '전체 상품', depth: 0, badge: 'depth 2' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '세일', depth: 1 },
            { icon: '📂', label: '카테고리', depth: 0, badge: 'depth 2' },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '❓', label: '고객센터', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '위시리스트', depth: 1 },
            { label: '쿠폰함', depth: 1 }
        ],
        brand: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '✨', label: '브랜드', depth: 0, badge: 'depth 2' },
            { label: '브랜드 스토리', depth: 1 },
            { label: '철학', depth: 1 },
            { label: '히스토리', depth: 1 },
            { icon: '📦', label: '제품', depth: 0, badge: 'depth 2' },
            { label: '라인업 소개', depth: 1 },
            { label: '신제품', depth: 1 },
            { icon: '📰', label: '뉴스', depth: 0 },
            { icon: '📍', label: '매장 찾기', depth: 0 },
            { icon: '💼', label: '채용', depth: 0 },
            { icon: '📞', label: '고객센터', depth: 0 }
        ],
        corporate: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🏢', label: '회사소개', depth: 0, badge: 'depth 3' },
            { label: '인사말', depth: 1 },
            { label: '연혁', depth: 1 },
            { label: '조직도', depth: 1 },
            { label: 'CI/BI', depth: 1 },
            { icon: '💼', label: '사업영역', depth: 0, badge: 'depth 2' },
            { label: '주요 사업', depth: 1 },
            { label: '실적', depth: 1 },
            { icon: '📰', label: 'PR', depth: 0, badge: 'depth 2' },
            { label: '보도자료', depth: 1 },
            { label: '공지사항', depth: 1 },
            { icon: '👥', label: '채용', depth: 0 },
            { icon: '📞', label: '문의', depth: 0 }
        ],
        service: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '💡', label: '서비스 소개', depth: 0, badge: 'depth 2' },
            { label: '주요 기능', depth: 1 },
            { label: '사용 방법', depth: 1 },
            { icon: '💰', label: '요금제', depth: 0 },
            { icon: '📝', label: '신청하기', depth: 0 },
            { icon: '📚', label: '가이드', depth: 0, badge: 'depth 2' },
            { label: 'FAQ', depth: 1 },
            { label: '이용약관', depth: 1 },
            { icon: '📞', label: '고객센터', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0 }
        ],
        portal: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📋', label: '게시판', depth: 0, badge: 'depth 2' },
            { label: '자유게시판', depth: 1 },
            { label: '질문답변', depth: 1 },
            { label: '정보공유', depth: 1 },
            { icon: '📂', label: '카테고리', depth: 0 },
            { icon: '🔍', label: '검색', depth: 0 },
            { icon: '🔔', label: '알림', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '내가 쓴 글', depth: 1 },
            { label: '댓글', depth: 1 },
            { label: '팔로잉', depth: 1 }
        ],
        booking: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📋', label: '서비스 소개', depth: 0 },
            { icon: '📅', label: '예약하기', depth: 0, badge: 'depth 2' },
            { label: '날짜 선택', depth: 1 },
            { label: '시간 선택', depth: 1 },
            { label: '옵션 선택', depth: 1 },
            { icon: '💳', label: '결제', depth: 0 },
            { icon: '⭐', label: '리뷰', depth: 0 },
            { icon: '📞', label: '고객센터', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '예약내역', depth: 1 },
            { label: '지난 예약', depth: 1 }
        ],
        membership: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🎖️', label: '멤버십 소개', depth: 0, badge: 'depth 2' },
            { label: '등급 안내', depth: 1 },
            { label: '혜택 안내', depth: 1 },
            { icon: '🎁', label: '혜택', depth: 0, badge: 'depth 2' },
            { label: '포인트', depth: 1 },
            { label: '쿠폰', depth: 1 },
            { label: '제휴 혜택', depth: 1 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '📞', label: '고객센터', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0 }
        ]
    };

    // 업종별 IA 트리 데이터 (depth 4까지 지원)
    const iaTreeData = {
        fashion: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🛍️', label: '전체 상품', depth: 0, badge: 'depth 4' },
            { label: '신상품', depth: 1 },
            { label: '이번주 신상', depth: 2 },
            { label: '프리오더', depth: 2 },
            { label: '베스트', depth: 1 },
            { label: '주간 베스트', depth: 2 },
            { label: '월간 베스트', depth: 2 },
            { label: '세일', depth: 1 },
            { label: '타임세일', depth: 2 },
            { label: '시즌오프', depth: 2 },
            { icon: '👗', label: '카테고리', depth: 0, badge: 'depth 4' },
            { label: '아우터', depth: 1 },
            { label: '코트', depth: 2 },
            { label: '롱코트', depth: 3 },
            { label: '숏코트', depth: 3 },
            { label: '패딩', depth: 2 },
            { label: '롱패딩', depth: 3 },
            { label: '숏패딩', depth: 3 },
            { label: '자켓', depth: 2 },
            { label: '상의', depth: 1 },
            { label: '티셔츠', depth: 2 },
            { label: '반팔', depth: 3 },
            { label: '긴팔', depth: 3 },
            { label: '니트', depth: 2 },
            { label: '셔츠', depth: 2 },
            { label: '하의', depth: 1 },
            { label: '팬츠', depth: 2 },
            { label: '데님', depth: 3 },
            { label: '슬랙스', depth: 3 },
            { label: '조거팬츠', depth: 3 },
            { label: '스커트', depth: 2 },
            { icon: '💡', label: '스타일링', depth: 0, badge: 'depth 3' },
            { label: '코디 추천', depth: 1 },
            { label: 'AI 코디', depth: 2 },
            { label: '스타일리스트 추천', depth: 2 },
            { label: '체형별 코디', depth: 3 },
            { label: '트렌드', depth: 1 },
            { label: '이번주 트렌드', depth: 2 },
            { label: '시즌 트렌드', depth: 2 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '❓', label: '고객센터', depth: 0, badge: 'depth 3' },
            { label: 'FAQ', depth: 1 },
            { label: '주문/결제', depth: 2 },
            { label: '배송', depth: 2 },
            { label: '교환/반품', depth: 2 },
            { label: '1:1 문의', depth: 1 },
            { label: '공지사항', depth: 1 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 4' },
            { label: '주문관리', depth: 1 },
            { label: '주문내역', depth: 2 },
            { label: '주문상세', depth: 3 },
            { label: '배송조회', depth: 3 },
            { label: '취소/교환/반품', depth: 2 },
            { label: '관심상품', depth: 1 },
            { label: '위시리스트', depth: 2 },
            { label: '최근 본 상품', depth: 2 },
            { label: '혜택', depth: 1 },
            { label: '쿠폰함', depth: 2 },
            { label: '사용가능 쿠폰', depth: 3 },
            { label: '사용완료', depth: 3 },
            { label: '적립금', depth: 2 },
            { label: '멤버십 등급', depth: 2 },
            { label: '회원정보', depth: 1 },
            { label: '정보수정', depth: 2 },
            { label: '배송지 관리', depth: 2 }
        ],
        beauty: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '✨', label: '전체 상품', depth: 0, badge: 'depth 3' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '주간 베스트', depth: 2 },
            { label: '월간 베스트', depth: 2 },
            { label: '특가', depth: 1 },
            { icon: '💄', label: '카테고리', depth: 0, badge: 'depth 4' },
            { label: '스킨케어', depth: 1 },
            { label: '클렌징', depth: 2 },
            { label: '폼클렌징', depth: 3 },
            { label: '클렌징오일', depth: 3 },
            { label: '토너/스킨', depth: 2 },
            { label: '에센스/세럼', depth: 2 },
            { label: '크림', depth: 2 },
            { label: '메이크업', depth: 1 },
            { label: '베이스', depth: 2 },
            { label: '프라이머', depth: 3 },
            { label: '파운데이션', depth: 3 },
            { label: '쿠션', depth: 3 },
            { label: '립', depth: 2 },
            { label: '립스틱', depth: 3 },
            { label: '립틴트', depth: 3 },
            { label: '아이', depth: 2 },
            { label: '바디케어', depth: 1 },
            { label: '바디로션', depth: 2 },
            { label: '바디워시', depth: 2 },
            { label: '헤어케어', depth: 1 },
            { icon: '🔬', label: 'AI 피부진단', depth: 0, badge: 'depth 3' },
            { label: '피부타입 분석', depth: 1 },
            { label: '설문 분석', depth: 2 },
            { label: 'AI 이미지 분석', depth: 2 },
            { label: '맞춤 제품 추천', depth: 1 },
            { label: '진단 히스토리', depth: 1 },
            { icon: '📦', label: '정기구독', depth: 0, badge: 'depth 2' },
            { label: '구독 상품', depth: 1 },
            { label: '구독 관리', depth: 1 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '💡', label: '뷰티팁', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 3' },
            { label: '주문내역', depth: 1 },
            { label: '주문상세', depth: 2 },
            { label: '배송조회', depth: 2 },
            { label: '구독관리', depth: 1 },
            { label: '피부진단 기록', depth: 1 }
        ],
        fnb: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📋', label: '메뉴 소개', depth: 0, badge: 'depth 4' },
            { label: '시그니처', depth: 1 },
            { label: '커피', depth: 1 },
            { label: '에스프레소', depth: 2 },
            { label: '아메리카노', depth: 3 },
            { label: '라떼', depth: 3 },
            { label: '브루드', depth: 2 },
            { label: '콜드브루', depth: 3 },
            { label: '드립커피', depth: 3 },
            { label: '음료', depth: 1 },
            { label: '티', depth: 2 },
            { label: '녹차', depth: 3 },
            { label: '홍차', depth: 3 },
            { label: '허브티', depth: 3 },
            { label: '에이드', depth: 2 },
            { label: '스무디', depth: 2 },
            { label: '디저트', depth: 1 },
            { label: '케이크', depth: 2 },
            { label: '마카롱', depth: 2 },
            { label: '쿠키', depth: 2 },
            { icon: '📅', label: '예약하기', depth: 0, badge: 'depth 2' },
            { label: '날짜 선택', depth: 1 },
            { label: '시간 선택', depth: 1 },
            { icon: '🛵', label: '주문하기', depth: 0, badge: 'depth 3' },
            { label: '배달주문', depth: 1 },
            { label: '메뉴선택', depth: 2 },
            { label: '옵션선택', depth: 2 },
            { label: '결제', depth: 2 },
            { label: '포장주문', depth: 1 },
            { icon: '📍', label: '매장찾기', depth: 0, badge: 'depth 2' },
            { label: '지도검색', depth: 1 },
            { label: '매장상세', depth: 1 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 3' },
            { label: '주문내역', depth: 1 },
            { label: '주문상세', depth: 2 },
            { label: '재주문', depth: 2 },
            { label: '포인트', depth: 1 },
            { label: '적립내역', depth: 2 },
            { label: '사용내역', depth: 2 },
            { label: '리뷰', depth: 1 }
        ],
        healthcare: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🏥', label: '병원소개', depth: 0, badge: 'depth 3' },
            { label: '의료진 소개', depth: 1 },
            { label: '전문의', depth: 2 },
            { label: '간호사', depth: 2 },
            { label: '진료과목', depth: 1 },
            { label: '내과', depth: 2 },
            { label: '외과', depth: 2 },
            { label: '정형외과', depth: 2 },
            { label: '시설안내', depth: 1 },
            { label: '층별안내', depth: 2 },
            { label: '편의시설', depth: 2 },
            { icon: '📅', label: '진료예약', depth: 0, badge: 'depth 4' },
            { label: '온라인 예약', depth: 1 },
            { label: '진료과 선택', depth: 2 },
            { label: '의료진 선택', depth: 3 },
            { label: '날짜 선택', depth: 3 },
            { label: '시간 선택', depth: 3 },
            { label: '예약 확인', depth: 4 },
            { label: '예약 조회/변경', depth: 1 },
            { label: '예약 확인', depth: 2 },
            { label: '예약 변경', depth: 2 },
            { label: '예약 취소', depth: 2 },
            { icon: '💊', label: '건강검진', depth: 0, badge: 'depth 2' },
            { label: '검진 프로그램', depth: 1 },
            { label: '검진 예약', depth: 1 },
            { icon: '📱', label: '비대면 진료', depth: 0, badge: 'depth 3' },
            { label: '화상진료', depth: 1 },
            { label: '진료 신청', depth: 2 },
            { label: '대기실', depth: 2 },
            { label: '진료실', depth: 2 },
            { label: '전화상담', depth: 1 },
            { icon: '📋', label: '증명서 발급', depth: 0 },
            { icon: '📰', label: '건강정보', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 3' },
            { label: '진료내역', depth: 1 },
            { label: '진료상세', depth: 2 },
            { label: '처방내역', depth: 2 },
            { label: '검사결과', depth: 1 },
            { label: '결과조회', depth: 2 },
            { label: '결과해석', depth: 2 },
            { label: '처방전', depth: 1 }
        ],
        education: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📚', label: '강좌안내', depth: 0, badge: 'depth 4' },
            { label: '프로그래밍', depth: 1 },
            { label: '웹개발', depth: 2 },
            { label: 'HTML/CSS', depth: 3 },
            { label: 'JavaScript', depth: 3 },
            { label: 'React', depth: 3 },
            { label: '앱개발', depth: 2 },
            { label: 'iOS', depth: 3 },
            { label: 'Android', depth: 3 },
            { label: 'Flutter', depth: 3 },
            { label: '백엔드', depth: 2 },
            { label: 'Python', depth: 3 },
            { label: 'Java', depth: 3 },
            { label: 'Node.js', depth: 3 },
            { label: '디자인', depth: 1 },
            { label: 'UI/UX', depth: 2 },
            { label: '피그마', depth: 3 },
            { label: '디자인시스템', depth: 3 },
            { label: '그래픽', depth: 2 },
            { label: '비즈니스', depth: 1 },
            { label: '마케팅', depth: 2 },
            { label: 'PM', depth: 2 },
            { label: '어학', depth: 1 },
            { label: '영어', depth: 2 },
            { label: '회화', depth: 3 },
            { label: '비즈니스영어', depth: 3 },
            { label: '일본어', depth: 2 },
            { label: '중국어', depth: 2 },
            { icon: '🎓', label: '수강신청', depth: 0, badge: 'depth 2' },
            { label: '강좌 선택', depth: 1 },
            { label: '결제', depth: 1 },
            { icon: '💻', label: '내 강의실', depth: 0, badge: 'depth 3' },
            { label: '수강중인 강의', depth: 1 },
            { label: '강의 목록', depth: 2 },
            { label: '진도율', depth: 2 },
            { label: '과제 제출', depth: 1 },
            { label: '제출 목록', depth: 2 },
            { label: '피드백', depth: 2 },
            { label: '수료증', depth: 1 },
            { icon: '❓', label: '학습 Q&A', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '수강내역', depth: 1 },
            { label: '결제내역', depth: 1 },
            { label: '쿠폰함', depth: 1 }
        ],
        travel: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '✈️', label: '항공권', depth: 0, badge: 'depth 4' },
            { label: '국내선', depth: 1 },
            { label: '편도', depth: 2 },
            { label: '출발지 선택', depth: 3 },
            { label: '도착지 선택', depth: 3 },
            { label: '날짜 선택', depth: 3 },
            { label: '좌석 선택', depth: 4 },
            { label: '왕복', depth: 2 },
            { label: '국제선', depth: 1 },
            { label: '아시아', depth: 2 },
            { label: '일본', depth: 3 },
            { label: '중국', depth: 3 },
            { label: '동남아', depth: 3 },
            { label: '유럽', depth: 2 },
            { label: '미주', depth: 2 },
            { icon: '🏨', label: '숙소', depth: 0, badge: 'depth 4' },
            { label: '호텔', depth: 1 },
            { label: '국내호텔', depth: 2 },
            { label: '서울', depth: 3 },
            { label: '강남', depth: 4 },
            { label: '명동', depth: 4 },
            { label: '부산', depth: 3 },
            { label: '제주', depth: 3 },
            { label: '해외호텔', depth: 2 },
            { label: '펜션', depth: 1 },
            { label: '리조트', depth: 1 },
            { label: '게스트하우스', depth: 1 },
            { icon: '🎫', label: '패키지', depth: 0, badge: 'depth 3' },
            { label: '국내여행', depth: 1 },
            { label: '제주도', depth: 2 },
            { label: '강원도', depth: 2 },
            { label: '해외여행', depth: 1 },
            { label: '일본', depth: 2 },
            { label: '도쿄', depth: 3 },
            { label: '오사카', depth: 3 },
            { label: '동남아', depth: 2 },
            { icon: '🎟️', label: '투어/티켓', depth: 0 },
            { icon: '🚗', label: '렌터카', depth: 0 },
            { icon: '💡', label: '여행정보', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 3' },
            { label: '예약내역', depth: 1 },
            { label: '예약상세', depth: 2 },
            { label: '예약변경', depth: 2 },
            { label: '마일리지', depth: 1 },
            { label: '적립내역', depth: 2 },
            { label: '사용내역', depth: 2 },
            { label: '리뷰', depth: 1 }
        ],
        finance: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '💰', label: '상품안내', depth: 0, badge: 'depth 4' },
            { label: '예금', depth: 1 },
            { label: '정기예금', depth: 2 },
            { label: '자유예금', depth: 2 },
            { label: '적금', depth: 1 },
            { label: '정기적금', depth: 2 },
            { label: '자유적금', depth: 2 },
            { label: '펀드', depth: 1 },
            { label: '주식형', depth: 2 },
            { label: '국내주식', depth: 3 },
            { label: '해외주식', depth: 3 },
            { label: '채권형', depth: 2 },
            { label: '혼합형', depth: 2 },
            { label: '대출', depth: 1 },
            { label: '신용대출', depth: 2 },
            { label: '직장인대출', depth: 3 },
            { label: '사업자대출', depth: 3 },
            { label: '담보대출', depth: 2 },
            { label: '주택담보', depth: 3 },
            { label: '전세자금', depth: 3 },
            { label: '보험', depth: 1 },
            { label: '생명보험', depth: 2 },
            { label: '손해보험', depth: 2 },
            { icon: '📊', label: '자산관리', depth: 0, badge: 'depth 3' },
            { label: '내 자산', depth: 1 },
            { label: '계좌조회', depth: 2 },
            { label: '잔액조회', depth: 3 },
            { label: '거래내역', depth: 3 },
            { label: '카드조회', depth: 2 },
            { label: '포트폴리오', depth: 1 },
            { label: '자산배분', depth: 2 },
            { label: '수익률', depth: 2 },
            { icon: '💳', label: '이체/결제', depth: 0, badge: 'depth 3' },
            { label: '계좌이체', depth: 1 },
            { label: '즉시이체', depth: 2 },
            { label: '자동이체', depth: 2 },
            { label: '예약이체', depth: 2 },
            { label: '결제', depth: 1 },
            { label: '간편결제', depth: 2 },
            { label: '카드결제', depth: 2 },
            { icon: '🤖', label: 'AI 추천', depth: 0, badge: 'depth 2' },
            { label: '상품 추천', depth: 1 },
            { label: '로보어드바이저', depth: 1 },
            { icon: '❓', label: '고객센터', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 3' },
            { label: '내 정보', depth: 1 },
            { label: '개인정보 수정', depth: 2 },
            { label: '보안설정', depth: 2 },
            { label: '알림설정', depth: 2 },
            { label: '상품관리', depth: 1 },
            { label: '가입상품', depth: 2 },
            { label: '관심상품', depth: 2 }
        ],
        realestate: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🏢', label: '매물검색', depth: 0, badge: 'depth 4' },
            { label: '아파트', depth: 1 },
            { label: '매매', depth: 2 },
            { label: '서울', depth: 3 },
            { label: '강남구', depth: 4 },
            { label: '서초구', depth: 4 },
            { label: '송파구', depth: 4 },
            { label: '경기', depth: 3 },
            { label: '전세', depth: 2 },
            { label: '월세', depth: 2 },
            { label: '오피스텔', depth: 1 },
            { label: '매매', depth: 2 },
            { label: '전세', depth: 2 },
            { label: '월세', depth: 2 },
            { label: '빌라/주택', depth: 1 },
            { label: '상가/사무실', depth: 1 },
            { icon: '🗺️', label: '지도검색', depth: 0, badge: 'depth 2' },
            { label: '지역선택', depth: 1 },
            { label: '필터설정', depth: 1 },
            { icon: '📊', label: '시세정보', depth: 0, badge: 'depth 3' },
            { label: '실거래가', depth: 1 },
            { label: '아파트', depth: 2 },
            { label: '오피스텔', depth: 2 },
            { label: '시세동향', depth: 1 },
            { label: '지역별 시세', depth: 2 },
            { label: '평형별 시세', depth: 2 },
            { icon: '🏠', label: '3D 투어', depth: 0, badge: 'depth 2' },
            { label: 'VR 견학', depth: 1 },
            { label: '360° 투어', depth: 1 },
            { icon: '👷', label: '중개사', depth: 0, badge: 'depth 2' },
            { label: '중개사 찾기', depth: 1 },
            { label: '상담 신청', depth: 1 },
            { icon: '📅', label: '방문예약', depth: 0 },
            { icon: '📋', label: '계약관리', depth: 0, badge: 'depth 3' },
            { label: '진행중 계약', depth: 1 },
            { label: '계약서 작성', depth: 2 },
            { label: '서류 제출', depth: 2 },
            { label: '완료된 계약', depth: 1 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 3' },
            { label: '관심매물', depth: 1 },
            { label: '찜한 매물', depth: 2 },
            { label: '최근 본 매물', depth: 2 },
            { label: '문의내역', depth: 1 },
            { label: '계약내역', depth: 1 }
        ],
        public: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🏛️', label: '기관소개', depth: 0, badge: 'depth 3' },
            { label: '인사말', depth: 1 },
            { label: '조직도', depth: 1 },
            { label: '부서소개', depth: 2 },
            { label: '담당업무', depth: 2 },
            { label: '찾아오시는 길', depth: 1 },
            { icon: '📝', label: '민원신청', depth: 0, badge: 'depth 3' },
            { label: '온라인 민원', depth: 1 },
            { label: '민원 접수', depth: 2 },
            { label: '진행 상태', depth: 2 },
            { label: '민원 조회', depth: 1 },
            { label: '증명서 발급', depth: 1 },
            { icon: '📰', label: '알림마당', depth: 0, badge: 'depth 2' },
            { label: '공지사항', depth: 1 },
            { label: '보도자료', depth: 1 },
            { icon: '📋', label: '정책정보', depth: 0 },
            { icon: '❓', label: '자주묻는질문', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0 }
        ],
        electronics: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📱', label: '전체 상품', depth: 0, badge: 'depth 4' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '특가', depth: 1 },
            { icon: '💻', label: '카테고리', depth: 0, badge: 'depth 4' },
            { label: 'TV/영상', depth: 1 },
            { label: 'TV', depth: 2 },
            { label: 'OLED TV', depth: 3 },
            { label: 'QLED TV', depth: 3 },
            { label: 'LED TV', depth: 3 },
            { label: '사운드바', depth: 2 },
            { label: '빔프로젝터', depth: 2 },
            { label: '냉장고', depth: 1 },
            { label: '양문형', depth: 2 },
            { label: '4도어', depth: 2 },
            { label: '김치냉장고', depth: 2 },
            { label: '세탁기', depth: 1 },
            { label: '드럼세탁기', depth: 2 },
            { label: '건조기', depth: 2 },
            { label: 'PC/노트북', depth: 1 },
            { label: '데스크탑', depth: 2 },
            { label: '노트북', depth: 2 },
            { label: '게이밍', depth: 3 },
            { label: '비즈니스', depth: 3 },
            { label: '모니터', depth: 2 },
            { icon: '🔧', label: 'A/S센터', depth: 0, badge: 'depth 3' },
            { label: 'A/S신청', depth: 1 },
            { label: '온라인접수', depth: 2 },
            { label: '방문예약', depth: 2 },
            { label: '진행조회', depth: 1 },
            { label: '서비스센터', depth: 1 },
            { icon: '📦', label: '렌탈/구독', depth: 0 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 3' },
            { label: '주문내역', depth: 1 },
            { label: 'A/S내역', depth: 1 },
            { label: '제품등록', depth: 1 },
            { label: '보증서 조회', depth: 2 }
        ],
        furniture: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🛋️', label: '전체 상품', depth: 0, badge: 'depth 4' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '특가', depth: 1 },
            { icon: '🪑', label: '카테고리', depth: 0, badge: 'depth 4' },
            { label: '거실', depth: 1 },
            { label: '소파', depth: 2 },
            { label: '1인소파', depth: 3 },
            { label: '2~3인소파', depth: 3 },
            { label: '코너소파', depth: 3 },
            { label: '거실장', depth: 2 },
            { label: '테이블', depth: 2 },
            { label: '침실', depth: 1 },
            { label: '침대', depth: 2 },
            { label: '싱글', depth: 3 },
            { label: '퀸', depth: 3 },
            { label: '킹', depth: 3 },
            { label: '매트리스', depth: 2 },
            { label: '옷장', depth: 2 },
            { label: '서재/사무', depth: 1 },
            { label: '책상', depth: 2 },
            { label: '의자', depth: 2 },
            { label: '책장', depth: 2 },
            { label: '주방', depth: 1 },
            { label: '식탁', depth: 2 },
            { label: '수납장', depth: 2 },
            { icon: '🎨', label: '3D/AR', depth: 0, badge: 'depth 2' },
            { label: '3D 뷰어', depth: 1 },
            { label: 'AR 배치', depth: 1 },
            { icon: '💡', label: '인테리어 상담', depth: 0 },
            { icon: '🚚', label: '설치 예약', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '설치일정', depth: 1 },
            { label: '위시리스트', depth: 1 }
        ],
        sports: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '⚽', label: '전체 상품', depth: 0, badge: 'depth 4' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '세일', depth: 1 },
            { icon: '🏃', label: '카테고리', depth: 0, badge: 'depth 4' },
            { label: '러닝', depth: 1 },
            { label: '러닝화', depth: 2 },
            { label: '쿠셔닝', depth: 3 },
            { label: '레이싱', depth: 3 },
            { label: '러닝의류', depth: 2 },
            { label: '액세서리', depth: 2 },
            { label: '피트니스', depth: 1 },
            { label: '트레이닝복', depth: 2 },
            { label: '헬스용품', depth: 2 },
            { label: '요가/필라테스', depth: 2 },
            { label: '아웃도어', depth: 1 },
            { label: '등산', depth: 2 },
            { label: '등산화', depth: 3 },
            { label: '등산의류', depth: 3 },
            { label: '캠핑', depth: 2 },
            { label: '텐트', depth: 3 },
            { label: '캠핑용품', depth: 3 },
            { label: '골프', depth: 1 },
            { label: '클럽', depth: 2 },
            { label: '의류', depth: 2 },
            { icon: '👥', label: '커뮤니티', depth: 0, badge: 'depth 2' },
            { label: '운동 기록', depth: 1 },
            { label: '챌린지', depth: 1 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '운동 기록', depth: 1 },
            { label: '멤버십', depth: 1 }
        ],
        kids: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '👶', label: '전체 상품', depth: 0, badge: 'depth 4' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '세일', depth: 1 },
            { icon: '🧸', label: '카테고리', depth: 0, badge: 'depth 4' },
            { label: '의류', depth: 1 },
            { label: '신생아', depth: 2 },
            { label: '내의', depth: 3 },
            { label: '외출복', depth: 3 },
            { label: '유아', depth: 2 },
            { label: '아동', depth: 2 },
            { label: '수유/이유', depth: 1 },
            { label: '분유/이유식', depth: 2 },
            { label: '젖병', depth: 2 },
            { label: '기저귀', depth: 1 },
            { label: '완구', depth: 1 },
            { label: '인형', depth: 2 },
            { label: '블록', depth: 2 },
            { label: '교육완구', depth: 2 },
            { label: '유모차/카시트', depth: 1 },
            { icon: '📚', label: '육아정보', depth: 0, badge: 'depth 2' },
            { label: '연령별 정보', depth: 1 },
            { label: '육아팁', depth: 1 },
            { icon: '📈', label: '성장기록', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '아이정보', depth: 1 },
            { label: '성장앨범', depth: 1 }
        ],
        pets: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🐕', label: '전체 상품', depth: 0, badge: 'depth 4' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '세일', depth: 1 },
            { icon: '🦴', label: '카테고리', depth: 0, badge: 'depth 4' },
            { label: '강아지', depth: 1 },
            { label: '사료', depth: 2 },
            { label: '건식', depth: 3 },
            { label: '습식', depth: 3 },
            { label: '간식', depth: 2 },
            { label: '용품', depth: 2 },
            { label: '고양이', depth: 1 },
            { label: '사료', depth: 2 },
            { label: '간식', depth: 2 },
            { label: '모래', depth: 2 },
            { label: '용품', depth: 2 },
            { label: '소동물', depth: 1 },
            { icon: '🏥', label: '건강관리', depth: 0, badge: 'depth 2' },
            { label: '건강기록', depth: 1 },
            { label: '수의사상담', depth: 1 },
            { icon: '📦', label: '정기배송', depth: 0 },
            { icon: '👥', label: '커뮤니티', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '반려동물 정보', depth: 1 },
            { label: '건강기록', depth: 1 }
        ],
        luxury: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '💎', label: '전체 상품', depth: 0, badge: 'depth 4' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '프리오더', depth: 1 },
            { icon: '👜', label: '카테고리', depth: 0, badge: 'depth 4' },
            { label: '가방', depth: 1 },
            { label: '토트백', depth: 2 },
            { label: '숄더백', depth: 2 },
            { label: '크로스백', depth: 2 },
            { label: '클러치', depth: 2 },
            { label: '지갑/소품', depth: 1 },
            { label: '장지갑', depth: 2 },
            { label: '반지갑', depth: 2 },
            { label: '카드지갑', depth: 2 },
            { label: '의류', depth: 1 },
            { label: '여성의류', depth: 2 },
            { label: '남성의류', depth: 2 },
            { label: '주얼리', depth: 1 },
            { label: '목걸이', depth: 2 },
            { label: '팔찌', depth: 2 },
            { label: '시계', depth: 1 },
            { icon: '✨', label: 'VIP 서비스', depth: 0, badge: 'depth 2' },
            { label: '컨시어지', depth: 1 },
            { label: '예약방문', depth: 1 },
            { icon: '🔐', label: '정품인증', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: 'VIP 혜택', depth: 1 },
            { label: '정품 인증서', depth: 1 }
        ],
        restaurant: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🍽️', label: '메뉴', depth: 0, badge: 'depth 3' },
            { label: '시그니처', depth: 1 },
            { label: '메인', depth: 1 },
            { label: '스테이크', depth: 2 },
            { label: '파스타', depth: 2 },
            { label: '사이드', depth: 1 },
            { label: '음료', depth: 1 },
            { icon: '📅', label: '예약', depth: 0, badge: 'depth 3' },
            { label: '날짜 선택', depth: 1 },
            { label: '시간 선택', depth: 1 },
            { label: '인원 선택', depth: 1 },
            { label: '좌석 선택', depth: 2 },
            { icon: '⏳', label: '웨이팅', depth: 0, badge: 'depth 2' },
            { label: '원격 줄서기', depth: 1 },
            { label: '순번 확인', depth: 1 },
            { icon: '🛵', label: '주문', depth: 0, badge: 'depth 2' },
            { label: '배달주문', depth: 1 },
            { label: '포장주문', depth: 1 },
            { icon: '📍', label: '매장안내', depth: 0 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '예약내역', depth: 1 },
            { label: '주문내역', depth: 1 },
            { label: '포인트', depth: 1 }
        ],
        fitness: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🏋️', label: '수업', depth: 0, badge: 'depth 3' },
            { label: '그룹수업', depth: 1 },
            { label: '요가', depth: 2 },
            { label: '필라테스', depth: 2 },
            { label: '스피닝', depth: 2 },
            { label: '에어로빅', depth: 2 },
            { label: 'PT', depth: 1 },
            { label: '1:1 PT', depth: 2 },
            { label: '그룹 PT', depth: 2 },
            { icon: '📅', label: '예약', depth: 0, badge: 'depth 3' },
            { label: '수업예약', depth: 1 },
            { label: '날짜 선택', depth: 2 },
            { label: '시간 선택', depth: 2 },
            { label: 'PT예약', depth: 1 },
            { icon: '💳', label: '회원권', depth: 0, badge: 'depth 2' },
            { label: '이용권 구매', depth: 1 },
            { label: '회원권 관리', depth: 1 },
            { icon: '📊', label: '운동기록', depth: 0, badge: 'depth 2' },
            { label: '운동 일지', depth: 1 },
            { label: '바디체크', depth: 1 },
            { icon: '🔐', label: '락커/출석', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '회원권 정보', depth: 1 },
            { label: '예약내역', depth: 1 },
            { label: '운동기록', depth: 1 }
        ],
        salon: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '💇', label: '서비스', depth: 0, badge: 'depth 3' },
            { label: '헤어', depth: 1 },
            { label: '커트', depth: 2 },
            { label: '펌', depth: 2 },
            { label: '염색', depth: 2 },
            { label: '네일', depth: 1 },
            { label: '젤네일', depth: 2 },
            { label: '케어', depth: 2 },
            { label: '메이크업', depth: 1 },
            { icon: '👩‍🎨', label: '디자이너', depth: 0, badge: 'depth 2' },
            { label: '디자이너 소개', depth: 1 },
            { label: '포트폴리오', depth: 1 },
            { icon: '📅', label: '예약', depth: 0, badge: 'depth 3' },
            { label: '서비스 선택', depth: 1 },
            { label: '디자이너 선택', depth: 1 },
            { label: '시간 선택', depth: 1 },
            { icon: '🎨', label: '스타일 추천', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '예약내역', depth: 1 },
            { label: '포인트', depth: 1 },
            { label: '리뷰', depth: 1 }
        ],
        consulting: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '💼', label: '서비스', depth: 0, badge: 'depth 3' },
            { label: '경영컨설팅', depth: 1 },
            { label: '전략', depth: 2 },
            { label: '조직', depth: 2 },
            { label: 'IT컨설팅', depth: 1 },
            { label: '디지털전환', depth: 2 },
            { label: '시스템구축', depth: 2 },
            { label: '마케팅컨설팅', depth: 1 },
            { icon: '👥', label: '전문가', depth: 0, badge: 'depth 2' },
            { label: '전문가 소개', depth: 1 },
            { label: '전문가 매칭', depth: 1 },
            { icon: '📝', label: '상담신청', depth: 0, badge: 'depth 2' },
            { label: '무료상담', depth: 1 },
            { label: '견적요청', depth: 1 },
            { icon: '📂', label: '프로젝트', depth: 0, badge: 'depth 2' },
            { label: '진행중', depth: 1 },
            { label: '완료', depth: 1 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '상담내역', depth: 1 },
            { label: '프로젝트', depth: 1 },
            { label: '결제내역', depth: 1 }
        ],
        recruitment: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '💼', label: '채용공고', depth: 0, badge: 'depth 3' },
            { label: '직무별', depth: 1 },
            { label: '개발', depth: 2 },
            { label: '기획', depth: 2 },
            { label: '디자인', depth: 2 },
            { label: '마케팅', depth: 2 },
            { label: '지역별', depth: 1 },
            { label: '경력별', depth: 1 },
            { icon: '🏢', label: '기업정보', depth: 0, badge: 'depth 2' },
            { label: '기업 소개', depth: 1 },
            { label: '기업 리뷰', depth: 1 },
            { icon: '📄', label: '이력서', depth: 0, badge: 'depth 2' },
            { label: '이력서 작성', depth: 1 },
            { label: '이력서 관리', depth: 1 },
            { icon: '📋', label: '지원현황', depth: 0, badge: 'depth 2' },
            { label: '지원내역', depth: 1 },
            { label: '면접일정', depth: 1 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '내 이력서', depth: 1 },
            { label: '지원현황', depth: 1 },
            { label: '관심기업', depth: 1 }
        ],
        media: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📰', label: '뉴스', depth: 0, badge: 'depth 3' },
            { label: '정치', depth: 1 },
            { label: '경제', depth: 1 },
            { label: '사회', depth: 1 },
            { label: '국제', depth: 1 },
            { label: 'IT/과학', depth: 1 },
            { label: '문화', depth: 1 },
            { label: '스포츠', depth: 1 },
            { icon: '🎬', label: '영상뉴스', depth: 0, badge: 'depth 2' },
            { label: '속보', depth: 1 },
            { label: '인터뷰', depth: 1 },
            { icon: '🎧', label: '팟캐스트', depth: 0 },
            { icon: '💎', label: '프리미엄', depth: 0, badge: 'depth 2' },
            { label: '심층분석', depth: 1 },
            { label: '독점기사', depth: 1 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '구독관리', depth: 1 },
            { label: '북마크', depth: 1 },
            { label: '댓글', depth: 1 }
        ],
        entertainment: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🎵', label: '콘텐츠', depth: 0, badge: 'depth 3' },
            { label: '음악', depth: 1 },
            { label: '최신곡', depth: 2 },
            { label: '인기차트', depth: 2 },
            { label: '장르별', depth: 2 },
            { label: '영상', depth: 1 },
            { label: 'MV', depth: 2 },
            { label: '라이브', depth: 2 },
            { label: '비하인드', depth: 2 },
            { icon: '⭐', label: '아티스트', depth: 0, badge: 'depth 2' },
            { label: '프로필', depth: 1 },
            { label: '일정', depth: 1 },
            { icon: '👥', label: '커뮤니티', depth: 0, badge: 'depth 2' },
            { label: '팬보드', depth: 1 },
            { label: '투표', depth: 1 },
            { icon: '🛍️', label: '굿즈샵', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '구독내역', depth: 1 },
            { label: '플레이리스트', depth: 1 },
            { label: '구매내역', depth: 1 }
        ],
        ott: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🎬', label: '콘텐츠', depth: 0, badge: 'depth 3' },
            { label: '영화', depth: 1 },
            { label: '최신영화', depth: 2 },
            { label: '인기영화', depth: 2 },
            { label: '장르별', depth: 2 },
            { label: '드라마', depth: 1 },
            { label: '한국드라마', depth: 2 },
            { label: '해외드라마', depth: 2 },
            { label: '예능', depth: 1 },
            { label: '다큐', depth: 1 },
            { label: '애니', depth: 1 },
            { icon: '🔍', label: '검색', depth: 0 },
            { icon: '📥', label: '다운로드', depth: 0 },
            { icon: '💎', label: '구독', depth: 0, badge: 'depth 2' },
            { label: '요금제', depth: 1 },
            { label: '결제', depth: 1 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '시청기록', depth: 1 },
            { label: '찜목록', depth: 1 },
            { label: '프로필관리', depth: 1 }
        ],
        gaming: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🎮', label: '게임', depth: 0, badge: 'depth 3' },
            { label: '신작', depth: 1 },
            { label: '인기', depth: 1 },
            { label: '장르별', depth: 1 },
            { label: 'RPG', depth: 2 },
            { label: '액션', depth: 2 },
            { label: '스포츠', depth: 2 },
            { icon: '🏆', label: '랭킹', depth: 0, badge: 'depth 2' },
            { label: '전체 랭킹', depth: 1 },
            { label: '길드 랭킹', depth: 1 },
            { icon: '👥', label: '커뮤니티', depth: 0, badge: 'depth 2' },
            { label: '자유게시판', depth: 1 },
            { label: '공략게시판', depth: 1 },
            { icon: '🛒', label: '상점', depth: 0 },
            { icon: '🎁', label: '이벤트', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '캐릭터', depth: 1 },
            { label: '인벤토리', depth: 1 },
            { label: '결제내역', depth: 1 }
        ],
        community: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📝', label: '게시판', depth: 0, badge: 'depth 3' },
            { label: '자유게시판', depth: 1 },
            { label: '질문답변', depth: 1 },
            { label: '정보공유', depth: 1 },
            { label: '후기', depth: 1 },
            { icon: '🔥', label: '인기', depth: 0, badge: 'depth 2' },
            { label: '실시간 인기', depth: 1 },
            { label: '주간 베스트', depth: 1 },
            { icon: '🔍', label: '검색', depth: 0 },
            { icon: '💬', label: '메시지', depth: 0 },
            { icon: '🔔', label: '알림', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '내가 쓴 글', depth: 1 },
            { label: '댓글', depth: 1 },
            { label: '팔로잉', depth: 1 }
        ],
        nonprofit: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🏛️', label: '단체소개', depth: 0, badge: 'depth 2' },
            { label: '인사말', depth: 1 },
            { label: '활동영역', depth: 1 },
            { label: '연혁', depth: 1 },
            { icon: '❤️', label: '후원하기', depth: 0, badge: 'depth 3' },
            { label: '일시후원', depth: 1 },
            { label: '정기후원', depth: 1 },
            { label: '후원 방법', depth: 2 },
            { label: '후원금 사용', depth: 2 },
            { icon: '🤝', label: '봉사활동', depth: 0, badge: 'depth 2' },
            { label: '봉사신청', depth: 1 },
            { label: '봉사일정', depth: 1 },
            { icon: '📰', label: '소식', depth: 0, badge: 'depth 2' },
            { label: '활동소식', depth: 1 },
            { label: '캠페인', depth: 1 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '후원내역', depth: 1 },
            { label: '봉사내역', depth: 1 },
            { label: '증명서', depth: 1 }
        ],
        association: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🏛️', label: '협회소개', depth: 0, badge: 'depth 2' },
            { label: '인사말', depth: 1 },
            { label: '조직도', depth: 1 },
            { label: '연혁', depth: 1 },
            { icon: '👥', label: '회원', depth: 0, badge: 'depth 3' },
            { label: '가입안내', depth: 1 },
            { label: '회비납부', depth: 1 },
            { label: '회원검색', depth: 1 },
            { label: '회원혜택', depth: 2 },
            { icon: '📅', label: '행사', depth: 0, badge: 'depth 2' },
            { label: '행사일정', depth: 1 },
            { label: '행사신청', depth: 1 },
            { icon: '📚', label: '자료실', depth: 0, badge: 'depth 2' },
            { label: '발간물', depth: 1 },
            { label: '양식', depth: 1 },
            { icon: '📰', label: '공지사항', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '회원정보', depth: 1 },
            { label: '납부내역', depth: 1 },
            { label: '행사참여', depth: 1 }
        ],
        university: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🎓', label: '학사정보', depth: 0, badge: 'depth 3' },
            { label: '학사일정', depth: 1 },
            { label: '수강신청', depth: 1 },
            { label: '강좌검색', depth: 2 },
            { label: '시간표', depth: 2 },
            { label: '성적조회', depth: 1 },
            { icon: '📚', label: '도서관', depth: 0, badge: 'depth 2' },
            { label: '자료검색', depth: 1 },
            { label: '대출/반납', depth: 1 },
            { icon: '🏢', label: '시설예약', depth: 0, badge: 'depth 2' },
            { label: '강의실', depth: 1 },
            { label: '열람실', depth: 1 },
            { icon: '💰', label: '장학금', depth: 0 },
            { icon: '📋', label: '증명서', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '내 정보', depth: 1 },
            { label: '수강내역', depth: 1 },
            { label: '성적', depth: 1 }
        ],
        b2b_commerce: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📦', label: '상품', depth: 0, badge: 'depth 3' },
            { label: '카테고리별', depth: 1 },
            { label: '제조사별', depth: 1 },
            { label: '신상품', depth: 1 },
            { icon: '📝', label: '견적', depth: 0, badge: 'depth 3' },
            { label: 'RFQ 요청', depth: 1 },
            { label: '견적서 조회', depth: 1 },
            { label: '견적 비교', depth: 2 },
            { icon: '🛒', label: '주문', depth: 0, badge: 'depth 2' },
            { label: '주문하기', depth: 1 },
            { label: '대량주문', depth: 1 },
            { icon: '📊', label: '통계', depth: 0, badge: 'depth 2' },
            { label: '구매현황', depth: 1 },
            { label: '거래분석', depth: 1 },
            { icon: '🏢', label: '거래처관리', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '정산내역', depth: 1 },
            { label: '기업정보', depth: 1 }
        ],
        saas: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '💡', label: '서비스소개', depth: 0, badge: 'depth 2' },
            { label: '주요기능', depth: 1 },
            { label: '도입사례', depth: 1 },
            { icon: '💰', label: '요금제', depth: 0, badge: 'depth 2' },
            { label: '무료체험', depth: 1 },
            { label: '요금 비교', depth: 1 },
            { icon: '📊', label: '대시보드', depth: 0, badge: 'depth 3' },
            { label: '현황', depth: 1 },
            { label: '분석', depth: 1 },
            { label: '리포트', depth: 2 },
            { label: '통계', depth: 2 },
            { icon: '👥', label: '팀관리', depth: 0, badge: 'depth 2' },
            { label: '멤버', depth: 1 },
            { label: '권한', depth: 1 },
            { icon: '🔌', label: 'API/연동', depth: 0 },
            { icon: '❓', label: '고객지원', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '구독관리', depth: 1 },
            { label: '결제내역', depth: 1 },
            { label: '설정', depth: 1 }
        ],
        manufacturing: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📦', label: '제품', depth: 0, badge: 'depth 3' },
            { label: '카탈로그', depth: 1 },
            { label: '카테고리별', depth: 2 },
            { label: '용도별', depth: 2 },
            { label: '신제품', depth: 1 },
            { icon: '📝', label: '견적', depth: 0, badge: 'depth 2' },
            { label: '견적요청', depth: 1 },
            { label: '견적조회', depth: 1 },
            { icon: '🏭', label: '생산', depth: 0, badge: 'depth 2' },
            { label: '생산현황', depth: 1 },
            { label: '품질관리', depth: 1 },
            { icon: '🚚', label: '물류', depth: 0, badge: 'depth 2' },
            { label: '배송조회', depth: 1 },
            { label: '재고현황', depth: 1 },
            { icon: '📄', label: '기술문서', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '정산내역', depth: 1 },
            { label: '거래처', depth: 1 }
        ],
        logistics: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🚚', label: '배송', depth: 0, badge: 'depth 3' },
            { label: '배송조회', depth: 1 },
            { label: '운송장번호', depth: 2 },
            { label: '주문번호', depth: 2 },
            { label: '운송예약', depth: 1 },
            { icon: '📊', label: '견적', depth: 0, badge: 'depth 2' },
            { label: '견적산출', depth: 1 },
            { label: '견적조회', depth: 1 },
            { icon: '🏢', label: '창고', depth: 0, badge: 'depth 2' },
            { label: '입고관리', depth: 1 },
            { label: '출고관리', depth: 1 },
            { label: '재고현황', depth: 1 },
            { icon: '📈', label: '대시보드', depth: 0, badge: 'depth 2' },
            { label: '물류현황', depth: 1 },
            { label: '정산', depth: 1 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '배송내역', depth: 1 },
            { label: '정산내역', depth: 1 },
            { label: '계약정보', depth: 1 }
        ],
        lifestyle: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🛍️', label: '전체 상품', depth: 0, badge: 'depth 3' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '세일', depth: 1 },
            { icon: '📂', label: '카테고리', depth: 0, badge: 'depth 3' },
            { label: '리빙', depth: 1 },
            { label: '주방', depth: 2 },
            { label: '욕실', depth: 2 },
            { label: '패션잡화', depth: 1 },
            { label: '뷰티', depth: 1 },
            { label: '푸드', depth: 1 },
            { icon: '🎯', label: '기획전', depth: 0 },
            { icon: '💡', label: '라이프매거진', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '위시리스트', depth: 1 },
            { label: '쿠폰함', depth: 1 }
        ]
    };

    // IA 전체선택 체크박스
    const iaFeatureSelectAll = document.getElementById('iaFeatureSelectAll');
    
    // 주요 기능 업데이트 함수
    function updateIAFeatures() {
        const industry = industrySelect?.value || '';
        const siteType = siteTypeSelect?.value || 'shopping';
        
        // 사이트 유형별 기본 기능
        let baseFeatures = siteTypeFeatures[siteType] || siteTypeFeatures['shopping'];
        
        // 업종이 선택되면 업종별 기능도 병합
        if (industry && industryFeatures[industry]) {
            const industryFeat = industryFeatures[industry];
            // 사이트 유형 기능과 업종 기능을 조합 (중복 제거)
            const combinedFeatures = [...new Set([...baseFeatures.slice(0, 5), ...industryFeat.slice(0, 5)])];
            baseFeatures = combinedFeatures.slice(0, 12);
        }
        
        if (featuresContainer) {
            featuresContainer.innerHTML = baseFeatures.map((feature, index) => `
                <label class="checkbox-item">
                    <input type="checkbox" name="ia_feature" value="${feature}" ${index < 5 ? 'checked' : ''}>
                    <span class="checkmark"></span>
                    <span>${feature}</span>
                </label>
            `).join('');
            
            // 전체선택 상태 업데이트
            if (iaFeatureSelectAll) iaFeatureSelectAll.checked = false;
            initIAFeatureCheckboxEvents();
        }
    }
    
    // IA 기능 체크박스 이벤트
    function initIAFeatureCheckboxEvents() {
        const checkboxes = featuresContainer?.querySelectorAll('input[name="ia_feature"]');
        checkboxes?.forEach(cb => {
            cb.addEventListener('change', updateIASelectAllState);
        });
    }
    
    // IA 전체선택 상태 업데이트
    function updateIASelectAllState() {
        const checkboxes = document.querySelectorAll('input[name="ia_feature"]');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        if (iaFeatureSelectAll) iaFeatureSelectAll.checked = allChecked;
    }
    
    // IA 전체선택 이벤트
    iaFeatureSelectAll?.addEventListener('change', (e) => {
        document.querySelectorAll('input[name="ia_feature"]').forEach(cb => cb.checked = e.target.checked);
    });

    // 업종 선택 시 주요 기능 업데이트
    industrySelect?.addEventListener('change', updateIAFeatures);
    
    // 초기 기능 체크박스 생성
    updateIAFeatures();
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const industry = industrySelect?.value || '';
        const siteType = siteTypeSelect?.value || 'shopping';
        
        // 업종이 선택되면 업종 트리, 아니면 사이트 유형 트리 사용
        let treeData;
        if (industry && iaTreeData[industry]) {
            treeData = iaTreeData[industry];
        } else {
            treeData = siteTypeTreeData[siteType] || siteTypeTreeData['shopping'];
        }
        
        // 트리 업데이트
        if (iaTree) {
            iaTree.innerHTML = treeData.map(item => `
                <div class="tree-item depth-${item.depth}">
                    ${item.icon ? `<span class="tree-icon">${item.icon}</span>` : ''}
                    <span class="tree-label">${item.label}</span>
                    ${item.badge ? `<span class="tree-badge">${item.badge}</span>` : ''}
                </div>
            `).join('');
        }
        
        // 분석 결과 업데이트
        const industryNames = {
            fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어',
            education: '교육', travel: '여행', public: '공공기관', electronics: '가전',
            furniture: '가구', sports: '스포츠', kids: '유아동', pets: '반려동물',
            luxury: '럭셔리', realestate: '부동산', finance: '금융', restaurant: '레스토랑',
            fitness: '피트니스', salon: '뷰티샵', consulting: '컨설팅', recruitment: '채용',
            media: '미디어', entertainment: '엔터테인먼트', ott: 'OTT', community: '커뮤니티',
            nonprofit: '비영리', association: '협회', university: '대학', b2b_commerce: 'B2B',
            saas: 'SaaS', manufacturing: '제조업'
        };
        
        const siteTypeNames = {
            shopping: '쇼핑몰', brand: '브랜드', corporate: '기업', service: '서비스',
            portal: '포털', booking: '예약', membership: '멤버십'
        };
        
        const displayName = industry ? (industryNames[industry] || industry) : (siteTypeNames[siteType] || siteType);
        document.getElementById('iaRefProjects').textContent = `유사 ${displayName} 프로젝트 ${Math.floor(Math.random() * 5) + 3}건`;
        document.getElementById('iaAvgDepth').textContent = (Math.random() * 1 + 2).toFixed(1);
        
        const productCount = document.getElementById('iaProductCount')?.value || 150;
        const catCount = Math.ceil(productCount / 20);
        document.getElementById('iaRecommendCat').textContent = `${catCount}~${catCount + 2}개 (${productCount}개 상품 기준)`;
        
        // Animate tree items
        const treeItems = iaTree.querySelectorAll('.tree-item');
        treeItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    });
}

// ============================================
// Tag Input
// ============================================

function initTagInput() {
    const tagInput = document.getElementById('featureInput');
    const selectedTags = document.getElementById('selectedTags');
    const suggestedTags = document.querySelectorAll('.suggested-tag');
    
    let tags = [];
    
    function addTag(tagText) {
        if (tags.includes(tagText)) return;
        
        tags.push(tagText);
        renderTags();
    }
    
    function removeTag(tagText) {
        tags = tags.filter(t => t !== tagText);
        renderTags();
    }
    
    function renderTags() {
        if (!selectedTags) return;
        
        selectedTags.innerHTML = tags.map(tag => `
            <span class="selected-tag">
                ${tag}
                <button type="button" onclick="this.closest('.selected-tag').remove()">&times;</button>
            </span>
        `).join('');
        
        // Add click events to remove buttons
        selectedTags.querySelectorAll('.selected-tag button').forEach((btn, index) => {
            btn.addEventListener('click', () => removeTag(tags[index]));
        });
    }
    
    tagInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = tagInput.value.trim();
            if (value) {
                addTag(value);
                tagInput.value = '';
            }
        }
    });
    
    suggestedTags.forEach(tag => {
        tag.addEventListener('click', () => {
            addTag(tag.getAttribute('data-tag'));
        });
    });
}

// ============================================
// Chat Widget
// ============================================

function initChatWidget() {
    const chatToggle = document.getElementById('chatToggle');
    const chatPanel = document.getElementById('chatPanel');
    const chatClose = document.getElementById('chatClose');
    const chatInput = chatPanel?.querySelector('.chat-input');
    const chatSend = chatPanel?.querySelector('.chat-send');
    const chatMessages = document.getElementById('chatMessages');
    const quickPrompts = document.querySelectorAll('.quick-prompt');
    
    chatToggle?.addEventListener('click', () => {
        chatPanel.classList.toggle('open');
    });
    
    chatClose?.addEventListener('click', () => {
        chatPanel.classList.remove('open');
    });
    
    function sendMessage(text) {
        if (!text.trim()) return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.innerHTML = `
            <div class="message-content" style="margin-left: auto; background: var(--gradient-primary); border-radius: var(--border-radius); border-top-right-radius: 4px;">
                ${text}
            </div>
        `;
        chatMessages.appendChild(userMsg);
        
        // Clear input
        if (chatInput) chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI response
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'chat-message ai';
            aiMsg.innerHTML = `
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                    </svg>
                </div>
                <div class="message-content">
                    ${getAIResponse(text)}
                </div>
            `;
            chatMessages.appendChild(aiMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
    
    function getAIResponse(text) {
        const responses = {
            '견적': '견적 산출은 좌측 메뉴의 "견적 산출"에서 가능합니다. 과거 유사 프로젝트 데이터를 기반으로 정확한 견적을 제시해드려요.',
            '제안서': '제안서 생성은 "제안서 생성" 메뉴에서 업종, 타겟, 플랫폼 정보를 입력하시면 AI가 자동으로 초안을 작성해드립니다.',
            '유사': '과거 유사 프로젝트를 찾으시려면 통합 검색을 이용해보세요. 업종, 플랫폼, 기능별로 필터링이 가능합니다.',
            'default': '네, 이해했습니다. 더 자세한 내용이 필요하시면 말씀해주세요. 견적 산출, 제안서 생성, 프로젝트 검색 등 다양한 기능을 도와드릴 수 있습니다.'
        };
        
        for (const [key, value] of Object.entries(responses)) {
            if (text.includes(key)) return value;
        }
        return responses.default;
    }
    
    chatSend?.addEventListener('click', () => {
        sendMessage(chatInput.value);
    });
    
    chatInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage(chatInput.value);
        }
    });
    
    quickPrompts.forEach(prompt => {
        prompt.addEventListener('click', () => {
            sendMessage(prompt.textContent);
        });
    });
}

// ============================================
// Quick Actions
// ============================================

function initQuickActions() {
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    const navItems = document.querySelectorAll('.nav-item');
    
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            
            // Find and click the corresponding nav item
            navItems.forEach(nav => {
                if (nav.getAttribute('data-page') === action) {
                    nav.click();
                }
            });
        });
    });
}

// ============================================
// Animations
// ============================================

function initAnimations() {
    // Animate stats on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate counters
                const counters = entry.target.querySelectorAll('.stat-value');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
    
    // Animate bars
    document.querySelectorAll('.bar-fill').forEach(bar => {
        const width = bar.style.getPropertyValue('--width');
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
    
    // Animate industry bars
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = getComputedStyle(bar).getPropertyValue('--width');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const industryCard = document.querySelector('.industry-card');
    if (industryCard) {
        barObserver.observe(industryCard);
    }
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    if (isNaN(target)) return;
    
    const suffix = element.textContent.replace(/[0-9,]/g, '');
    let current = 0;
    const increment = target / 50;
    const duration = 1000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, stepTime);
}

// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K for search focus
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-input')?.focus();
    }
    
    // Escape to close modals/chat
    if (e.key === 'Escape') {
        document.getElementById('chatPanel')?.classList.remove('open');
        document.querySelector('.sidebar')?.classList.remove('open');
    }
});

// ============================================
// Theme Toggle (Optional Enhancement)
// ============================================

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}

// ============================================
// Utility Functions
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR').format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date(date));
}

// ============================================
// Form Validation
// ============================================

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// ============================================
// Local Storage Helpers
// ============================================

const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    }
};

// ============================================
// API Simulation (For Demo)
// ============================================

const api = {
    async getProjects(filters = {}) {
        // Simulated API response
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: 'B사 뷰티 브랜드', industry: '뷰티', platform: 'Shopify', cost: 3200, status: 'won' },
                    { id: 2, name: 'C사 F&B 커머스', industry: 'F&B', platform: 'Cafe24', cost: 2800, status: 'won' },
                    { id: 3, name: 'D사 패션몰', industry: '패션', platform: '자체구축', cost: 5500, status: 'lost' },
                ]);
            }, 500);
        });
    },
    
    async generateProposal(data) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    references: [],
                    features: ['라이브커머스', 'AI 피부 진단', '플로팅 장바구니'],
                    estimate: { min: 3000, max: 3800, avg: 3400 }
                });
            }, 2000);
        });
    },
    
    async calculateEstimate(data) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    estimate: 3500,
                    range: { min: 2975, max: 4025 },
                    weeks: 8,
                    team: ['PM 1명', '디자이너 1명', '개발자 2명', '퍼블리셔 1명']
                });
            }, 1500);
        });
    }
};

// ============================================
// Search Page
// ============================================

function initSearchPage() {
    const searchInput = document.getElementById('mainSearchInput');
    const searchBtn = document.getElementById('mainSearchBtn');
    const searchResults = document.getElementById('searchResults');
    
    searchBtn?.addEventListener('click', () => {
        performSearch(searchInput?.value);
    });
    
    searchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

function performSearch(query) {
    if (!query?.trim()) return;
    
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        // Add loading animation
        searchResults.style.animation = 'none';
        searchResults.offsetHeight;
        searchResults.style.animation = 'fadeIn 0.5s ease';
        
        // Update results count
        const count = searchResults.querySelector('.results-count strong');
        if (count) {
            count.textContent = Math.floor(Math.random() * 50) + 10;
        }
    }
}

// ============================================
// Filter Buttons
// ============================================

function initFilterButtons() {
    const filterGroups = document.querySelectorAll('.search-filters');
    
    filterGroups.forEach(group => {
        const buttons = group.querySelectorAll('.filter-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });
}

// ============================================
// Functional Specification Form
// ============================================

function initFunctionalForm() {
    const form = document.getElementById('functionalForm');
    const resultCard = document.querySelector('.functional-result-card');
    const funcTypeSelect = document.getElementById('funcType');
    const funcIndustrySelect = document.getElementById('funcIndustry');
    const funcOptionsContainer = document.getElementById('funcOptions');
    const funcResultTitle = document.getElementById('funcResultTitle');
    const funcResultContent = document.getElementById('funcResultContent');

    // 업종별 기능 유형 데이터
    const industryFuncTypes = {
        // 커머스
        fashion: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }, { value: 'membership', name: '멤버십/등급' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'category', name: '카테고리' }, { value: 'search', name: '상품 검색' }, { value: 'size_guide', name: '사이즈 가이드' }, { value: 'styling', name: 'AI 코디 추천' }, { value: 'virtual_fitting', name: '가상 피팅' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'wishlist', name: '위시리스트' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }] },
            { group: '배송/CS', items: [{ value: 'delivery', name: '배송' }, { value: 'return', name: '반품/교환' }, { value: 'review', name: '리뷰/후기' }, { value: 'qna', name: 'Q&A' }] },
            { group: '마케팅', items: [{ value: 'point', name: '포인트' }, { value: 'coupon', name: '쿠폰' }, { value: 'event', name: '이벤트' }, { value: 'notification', name: '알림' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_user', name: '회원 관리' }, { value: 'admin_order', name: '주문 관리' }, { value: 'admin_stats', name: '통계/리포트' }] }
        ],
        beauty: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }, { value: 'membership', name: '멤버십' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'search', name: '상품 검색' }, { value: 'ingredient', name: '성분 분석' }, { value: 'skin_diagnosis', name: 'AI 피부진단' }, { value: 'virtual_makeup', name: '가상 메이크업' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }, { value: 'subscription', name: '정기구독' }] },
            { group: '배송/CS', items: [{ value: 'delivery', name: '배송' }, { value: 'review', name: '리뷰/후기' }, { value: 'qna', name: 'Q&A' }] },
            { group: '콘텐츠', items: [{ value: 'beauty_tip', name: '뷰티 팁' }, { value: 'routine', name: '스킨케어 루틴' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }] }
        ],
        fnb: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'search', name: '상품 검색' }, { value: 'nutrition', name: '영양정보' }, { value: 'allergy', name: '알레르기 정보' }, { value: 'recipe', name: '레시피' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }, { value: 'subscription', name: '정기배송' }] },
            { group: '배송/CS', items: [{ value: 'delivery', name: '배송' }, { value: 'fresh_delivery', name: '신선배송' }, { value: 'review', name: '리뷰' }] },
            { group: '매장', items: [{ value: 'store_search', name: '매장 찾기' }, { value: 'pickup', name: '픽업 예약' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }, { value: 'inventory', name: '재고/유통기한 관리' }] }
        ],
        electronics: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'search', name: '상품 검색' }, { value: 'spec_compare', name: '스펙 비교' }, { value: 'compatibility', name: '호환성 체크' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }, { value: 'rental', name: '렌탈' }] },
            { group: '서비스', items: [{ value: 'delivery', name: '배송' }, { value: 'installation', name: '설치 예약' }, { value: 'as_service', name: 'A/S 신청' }, { value: 'warranty', name: '보증 관리' }] },
            { group: 'CS', items: [{ value: 'review', name: '리뷰' }, { value: 'qna', name: 'Q&A' }, { value: 'manual', name: '사용설명서' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }, { value: 'admin_as', name: 'A/S 관리' }] }
        ],
        furniture: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'search', name: '상품 검색' }, { value: '3d_viewer', name: '3D 뷰어' }, { value: 'ar_placement', name: 'AR 배치' }, { value: 'size_simulation', name: '사이즈 시뮬레이션' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }, { value: 'custom_order', name: '맞춤 제작' }] },
            { group: '서비스', items: [{ value: 'delivery', name: '배송' }, { value: 'installation', name: '설치 예약' }, { value: 'interior_consult', name: '인테리어 상담' }] },
            { group: 'CS', items: [{ value: 'review', name: '리뷰' }, { value: 'qna', name: 'Q&A' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }] }
        ],
        sports: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }, { value: 'membership', name: '멤버십' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'search', name: '상품 검색' }, { value: 'size_recommend', name: '사이즈 추천' }, { value: 'gear_guide', name: '장비 가이드' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }, { value: 'rental', name: '장비 대여' }] },
            { group: '커뮤니티', items: [{ value: 'exercise_log', name: '운동 기록' }, { value: 'challenge', name: '챌린지' }, { value: 'board', name: '커뮤니티' }] },
            { group: 'CS', items: [{ value: 'delivery', name: '배송' }, { value: 'review', name: '리뷰' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }] }
        ],
        kids: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }, { value: 'child_profile', name: '아이 프로필' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'search', name: '상품 검색' }, { value: 'age_recommend', name: '연령별 추천' }, { value: 'safety_cert', name: '안전인증 정보' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }, { value: 'subscription', name: '정기배송' }, { value: 'gift', name: '선물하기' }] },
            { group: '콘텐츠', items: [{ value: 'parenting_info', name: '육아 정보' }, { value: 'growth_record', name: '성장 기록' }] },
            { group: 'CS', items: [{ value: 'delivery', name: '배송' }, { value: 'review', name: '리뷰' }, { value: 'qna', name: 'Q&A' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }] }
        ],
        pets: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }, { value: 'pet_profile', name: '반려동물 프로필' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'search', name: '상품 검색' }, { value: 'pet_recommend', name: '맞춤 추천' }, { value: 'nutrition_info', name: '영양 정보' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }, { value: 'subscription', name: '정기배송' }] },
            { group: '건강', items: [{ value: 'health_record', name: '건강 기록' }, { value: 'vet_consult', name: '수의사 상담' }, { value: 'vaccination', name: '예방접종 관리' }] },
            { group: '커뮤니티', items: [{ value: 'board', name: '커뮤니티' }, { value: 'review', name: '리뷰' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }] }
        ],
        luxury: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }, { value: 'vip_membership', name: 'VIP 멤버십' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'search', name: '상품 검색' }, { value: 'authenticity', name: '정품 인증' }, { value: 'limited_edition', name: '한정판 알림' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }, { value: 'preorder', name: '사전예약' }] },
            { group: 'VIP 서비스', items: [{ value: 'concierge', name: '컨시어지' }, { value: 'private_visit', name: '예약 방문' }, { value: 'after_care', name: '수선/관리' }] },
            { group: 'CS', items: [{ value: 'delivery', name: '프리미엄 배송' }, { value: 'review', name: '리뷰' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_vip', name: 'VIP 관리' }] }
        ],
        lifestyle: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '상품', items: [{ value: 'product', name: '상품 관리' }, { value: 'search', name: '상품 검색' }, { value: 'curation', name: '큐레이션' }, { value: 'live_commerce', name: '라이브 커머스' }] },
            { group: '구매', items: [{ value: 'cart', name: '장바구니' }, { value: 'order', name: '주문/구매' }, { value: 'payment', name: '결제' }, { value: 'subscription', name: '정기구독' }, { value: 'gift', name: '선물하기' }] },
            { group: '마케팅', items: [{ value: 'point', name: '포인트' }, { value: 'coupon', name: '쿠폰' }, { value: 'event', name: '이벤트' }] },
            { group: 'CS', items: [{ value: 'delivery', name: '배송' }, { value: 'review', name: '리뷰' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }] }
        ],
        // 서비스
        healthcare: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'identity_verify', name: '본인인증' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '진료', items: [{ value: 'booking', name: '진료 예약' }, { value: 'doctor_search', name: '의료진 검색' }, { value: 'telemedicine', name: '화상 진료' }, { value: 'medical_record', name: '진료 기록' }, { value: 'prescription', name: '처방전 관리' }] },
            { group: '검진', items: [{ value: 'health_checkup', name: '건강검진 예약' }, { value: 'checkup_result', name: '검진 결과' }, { value: 'ai_symptom', name: 'AI 증상 체크' }] },
            { group: '결제', items: [{ value: 'payment', name: '진료비 결제' }, { value: 'insurance_claim', name: '보험 청구' }] },
            { group: '콘텐츠', items: [{ value: 'health_info', name: '건강 정보' }, { value: 'medication_alarm', name: '복약 알림' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_booking', name: '예약 관리' }, { value: 'admin_patient', name: '환자 관리' }] }
        ],
        education: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '강좌', items: [{ value: 'course_search', name: '강좌 검색' }, { value: 'enrollment', name: '수강신청' }, { value: 'payment', name: '결제' }] },
            { group: '학습', items: [{ value: 'online_lecture', name: '온라인 강의' }, { value: 'live_class', name: '실시간 수업' }, { value: 'assignment', name: '과제 제출' }, { value: 'quiz', name: '퀴즈/시험' }, { value: 'progress', name: '학습 진도' }] },
            { group: '커뮤니티', items: [{ value: 'qna', name: '질문/답변' }, { value: 'study_group', name: '스터디 그룹' }, { value: 'board', name: '게시판' }] },
            { group: '인증', items: [{ value: 'certificate', name: '수료증 발급' }, { value: 'grade', name: '성적 조회' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_course', name: '강좌 관리' }, { value: 'admin_student', name: '학생 관리' }] }
        ],
        travel: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '예약', items: [{ value: 'flight_booking', name: '항공권 예약' }, { value: 'hotel_booking', name: '숙소 예약' }, { value: 'package_booking', name: '패키지 예약' }, { value: 'tour_booking', name: '투어/티켓' }, { value: 'rental_car', name: '렌터카' }] },
            { group: '결제', items: [{ value: 'payment', name: '결제' }, { value: 'insurance', name: '여행자 보험' }, { value: 'mileage', name: '마일리지' }] },
            { group: '일정', items: [{ value: 'schedule', name: '일정 관리' }, { value: 'travel_info', name: '여행 정보' }, { value: 'exchange_rate', name: '환율 계산' }] },
            { group: 'CS', items: [{ value: 'review', name: '리뷰' }, { value: 'qna', name: 'Q&A' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_booking', name: '예약 관리' }] }
        ],
        realestate: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '매물', items: [{ value: 'property_search', name: '매물 검색' }, { value: 'map_search', name: '지도 검색' }, { value: 'wishlist', name: '관심 매물' }, { value: '3d_tour', name: '3D 투어' }, { value: 'vr_tour', name: 'VR 견학' }] },
            { group: '정보', items: [{ value: 'price_info', name: '시세 정보' }, { value: 'real_price', name: '실거래가' }, { value: 'area_info', name: '주변 정보' }] },
            { group: '상담', items: [{ value: 'agent_consult', name: '중개사 상담' }, { value: 'visit_booking', name: '방문 예약' }, { value: 'loan_consult', name: '대출 상담' }] },
            { group: '계약', items: [{ value: 'contract', name: '계약 관리' }, { value: 'moving', name: '이사 견적' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_property', name: '매물 관리' }] }
        ],
        finance: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'identity_verify', name: '본인인증' }, { value: 'security_auth', name: '보안인증' }] },
            { group: '계좌', items: [{ value: 'account_link', name: '계좌 연결' }, { value: 'account_view', name: '계좌 조회' }, { value: 'transaction', name: '거래내역' }, { value: 'transfer', name: '이체' }] },
            { group: '상품', items: [{ value: 'product_search', name: '상품 조회' }, { value: 'deposit', name: '예금/적금' }, { value: 'loan', name: '대출' }, { value: 'insurance', name: '보험' }, { value: 'investment', name: '투자' }] },
            { group: '자산', items: [{ value: 'asset_management', name: '자산관리' }, { value: 'portfolio', name: '포트폴리오' }, { value: 'ai_advisor', name: '로보어드바이저' }] },
            { group: '결제', items: [{ value: 'payment', name: '결제' }, { value: 'card', name: '카드 관리' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_customer', name: '고객 관리' }] }
        ],
        restaurant: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '예약', items: [{ value: 'booking', name: '예약' }, { value: 'waiting', name: '웨이팅' }, { value: 'table_select', name: '테이블 선택' }] },
            { group: '주문', items: [{ value: 'menu', name: '메뉴 보기' }, { value: 'order', name: '주문' }, { value: 'payment', name: '결제' }, { value: 'takeout', name: '테이크아웃' }, { value: 'delivery', name: '배달 주문' }] },
            { group: '마케팅', items: [{ value: 'point', name: '포인트' }, { value: 'coupon', name: '쿠폰' }, { value: 'subscription', name: '구독권' }] },
            { group: 'CS', items: [{ value: 'review', name: '리뷰' }, { value: 'store_info', name: '매장 정보' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_booking', name: '예약 관리' }, { value: 'admin_order', name: '주문 관리' }] }
        ],
        fitness: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '예약', items: [{ value: 'class_booking', name: '수업 예약' }, { value: 'pt_booking', name: 'PT 예약' }, { value: 'schedule', name: '시간표' }] },
            { group: '회원권', items: [{ value: 'membership_purchase', name: '회원권 구매' }, { value: 'membership_manage', name: '회원권 관리' }, { value: 'payment', name: '결제' }] },
            { group: '운동', items: [{ value: 'exercise_log', name: '운동 기록' }, { value: 'body_check', name: '바디 체크' }, { value: 'diet', name: '식단 관리' }, { value: 'ai_coaching', name: 'AI 코칭' }] },
            { group: '시설', items: [{ value: 'attendance', name: '출석 체크' }, { value: 'locker', name: '락커 관리' }, { value: 'realtime_status', name: '실시간 현황' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_member', name: '회원 관리' }, { value: 'admin_booking', name: '예약 관리' }] }
        ],
        salon: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '예약', items: [{ value: 'booking', name: '예약' }, { value: 'designer_select', name: '디자이너 선택' }, { value: 'service_select', name: '시술 선택' }] },
            { group: '스타일', items: [{ value: 'style_search', name: '스타일 검색' }, { value: 'portfolio', name: '포트폴리오' }, { value: 'ar_simulation', name: 'AR 시뮬레이션' }, { value: 'style_recommend', name: '스타일 추천' }] },
            { group: '결제', items: [{ value: 'payment', name: '결제' }, { value: 'point', name: '포인트' }, { value: 'prepaid', name: '선결제' }] },
            { group: 'CS', items: [{ value: 'review', name: '리뷰' }, { value: 'notification', name: '예약 알림' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_booking', name: '예약 관리' }, { value: 'admin_designer', name: '디자이너 관리' }] }
        ],
        consulting: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '서비스', items: [{ value: 'service_intro', name: '서비스 소개' }, { value: 'expert_matching', name: '전문가 매칭' }, { value: 'portfolio', name: '포트폴리오' }] },
            { group: '상담', items: [{ value: 'consultation', name: '상담 신청' }, { value: 'quote_request', name: '견적 요청' }, { value: 'video_meeting', name: '화상 회의' }] },
            { group: '프로젝트', items: [{ value: 'project_manage', name: '프로젝트 관리' }, { value: 'document', name: '문서 관리' }, { value: 'milestone', name: '마일스톤' }, { value: 'report', name: '보고서' }] },
            { group: '결제', items: [{ value: 'payment', name: '결제' }, { value: 'contract', name: '계약 관리' }, { value: 'settlement', name: '정산' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_project', name: '프로젝트 관리' }] }
        ],
        recruitment: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '채용', items: [{ value: 'job_search', name: '채용공고 검색' }, { value: 'company_info', name: '기업 정보' }, { value: 'company_review', name: '기업 리뷰' }, { value: 'salary_info', name: '연봉 정보' }] },
            { group: '지원', items: [{ value: 'resume', name: '이력서 관리' }, { value: 'application', name: '지원하기' }, { value: 'application_status', name: '지원 현황' }] },
            { group: '면접', items: [{ value: 'interview_schedule', name: '면접 일정' }, { value: 'video_interview', name: '화상 면접' }, { value: 'ai_resume', name: 'AI 이력서 분석' }] },
            { group: '알림', items: [{ value: 'notification', name: '알림' }, { value: 'recommendation', name: '맞춤 추천' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_job', name: '공고 관리' }, { value: 'admin_applicant', name: '지원자 관리' }] }
        ],
        // 미디어/콘텐츠
        media: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '콘텐츠', items: [{ value: 'article_search', name: '기사 검색' }, { value: 'category', name: '카테고리' }, { value: 'video_news', name: '영상 뉴스' }, { value: 'podcast', name: '팟캐스트' }] },
            { group: '구독', items: [{ value: 'subscription', name: '구독' }, { value: 'premium', name: '프리미엄' }, { value: 'payment', name: '결제' }, { value: 'newsletter', name: '뉴스레터' }] },
            { group: '소통', items: [{ value: 'comment', name: '댓글' }, { value: 'bookmark', name: '북마크' }, { value: 'share', name: '공유' }] },
            { group: 'AI', items: [{ value: 'ai_summary', name: 'AI 요약' }, { value: 'personalized', name: '맞춤 뉴스' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_content', name: '콘텐츠 관리' }] }
        ],
        entertainment: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '콘텐츠', items: [{ value: 'content_search', name: '콘텐츠 검색' }, { value: 'music', name: '음악' }, { value: 'video', name: '영상' }, { value: 'live', name: '라이브 방송' }] },
            { group: '구독', items: [{ value: 'subscription', name: '구독' }, { value: 'payment', name: '결제' }, { value: 'membership', name: '멤버십' }] },
            { group: '소통', items: [{ value: 'like', name: '좋아요' }, { value: 'comment', name: '댓글' }, { value: 'playlist', name: '플레이리스트' }, { value: 'share', name: '공유' }] },
            { group: '팬', items: [{ value: 'fan_community', name: '팬 커뮤니티' }, { value: 'vote', name: '투표' }, { value: 'goods_shop', name: '굿즈샵' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_content', name: '콘텐츠 관리' }] }
        ],
        ott: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'profile', name: '프로필 관리' }] },
            { group: '콘텐츠', items: [{ value: 'content_search', name: '콘텐츠 검색' }, { value: 'watch', name: '시청' }, { value: 'download', name: '다운로드' }, { value: 'watch_history', name: '시청 기록' }] },
            { group: '구독', items: [{ value: 'subscription', name: '구독 결제' }, { value: 'plan', name: '요금제' }, { value: 'payment', name: '결제 관리' }] },
            { group: '개인화', items: [{ value: 'wishlist', name: '찜 목록' }, { value: 'ai_recommend', name: 'AI 추천' }, { value: 'rating', name: '평가' }] },
            { group: '설정', items: [{ value: 'parental_control', name: '자녀 보호' }, { value: 'quality', name: '화질 설정' }, { value: 'subtitle', name: '자막 설정' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_content', name: '콘텐츠 관리' }] }
        ],
        gaming: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '게임', items: [{ value: 'game_search', name: '게임 검색' }, { value: 'character', name: '캐릭터 관리' }, { value: 'inventory', name: '인벤토리' }] },
            { group: '결제', items: [{ value: 'payment', name: '결제' }, { value: 'in_app', name: '인앱 구매' }, { value: 'season_pass', name: '시즌패스' }] },
            { group: '경쟁', items: [{ value: 'ranking', name: '랭킹' }, { value: 'achievement', name: '업적' }, { value: 'leaderboard', name: '리더보드' }] },
            { group: '소셜', items: [{ value: 'friend', name: '친구' }, { value: 'guild', name: '길드' }, { value: 'chat', name: '채팅' }, { value: 'trade', name: '거래소' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_user', name: '유저 관리' }, { value: 'admin_report', name: '신고 관리' }] }
        ],
        community: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'profile', name: '프로필' }] },
            { group: '게시글', items: [{ value: 'post', name: '게시글 작성' }, { value: 'comment', name: '댓글' }, { value: 'like', name: '좋아요' }, { value: 'hashtag', name: '해시태그' }] },
            { group: '소셜', items: [{ value: 'follow', name: '팔로우' }, { value: 'message', name: '메시지' }, { value: 'notification', name: '알림' }] },
            { group: '그룹', items: [{ value: 'group', name: '그룹' }, { value: 'chat_room', name: '채팅방' }, { value: 'event', name: '이벤트' }] },
            { group: '탐색', items: [{ value: 'search', name: '검색' }, { value: 'trending', name: '트렌딩' }, { value: 'live', name: '라이브' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_content', name: '콘텐츠 관리' }, { value: 'admin_report', name: '신고 관리' }] }
        ],
        // 공공/기관
        public: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'identity_verify', name: '본인인증' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '민원', items: [{ value: 'civil_application', name: '민원 신청' }, { value: 'document_issue', name: '서류 발급' }, { value: 'civil_status', name: '민원 조회' }, { value: 'e_approval', name: '전자결재' }] },
            { group: '정보', items: [{ value: 'notice', name: '공지사항' }, { value: 'policy', name: '정책 정보' }, { value: 'agency_search', name: '기관 검색' }, { value: 'statistics', name: '통계 정보' }] },
            { group: '참여', items: [{ value: 'participation', name: '국민 참여' }, { value: 'survey', name: '설문조사' }, { value: 'report', name: '신고/제보' }] },
            { group: '상담', items: [{ value: 'faq', name: 'FAQ' }, { value: 'chatbot', name: '챗봇' }, { value: 'booking', name: '방문 예약' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_civil', name: '민원 관리' }] }
        ],
        nonprofit: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '후원', items: [{ value: 'donation', name: '후원하기' }, { value: 'regular_donation', name: '정기 후원' }, { value: 'payment', name: '결제' }, { value: 'donation_history', name: '후원 내역' }] },
            { group: '참여', items: [{ value: 'campaign', name: '캠페인' }, { value: 'volunteer', name: '봉사 신청' }, { value: 'crowdfunding', name: '크라우드펀딩' }] },
            { group: '소식', items: [{ value: 'news', name: '활동 소식' }, { value: 'newsletter', name: '뉴스레터' }, { value: 'transparency', name: '투명성 리포트' }] },
            { group: '증명', items: [{ value: 'certificate', name: '증명서 발급' }, { value: 'receipt', name: '기부 영수증' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_donation', name: '후원 관리' }] }
        ],
        association: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }, { value: 'member_search', name: '회원 검색' }] },
            { group: '회비', items: [{ value: 'membership_apply', name: '가입 신청' }, { value: 'fee_payment', name: '회비 납부' }, { value: 'payment', name: '결제' }] },
            { group: '행사', items: [{ value: 'event_apply', name: '행사 신청' }, { value: 'education', name: '교육 신청' }, { value: 'schedule', name: '행사 일정' }] },
            { group: '자료', items: [{ value: 'library', name: '자료실' }, { value: 'publication', name: '발간물' }, { value: 'notice', name: '공지사항' }] },
            { group: '소통', items: [{ value: 'board', name: '커뮤니티' }, { value: 'vote', name: '온라인 투표' }, { value: 'newsletter', name: '뉴스레터' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_member', name: '회원 관리' }] }
        ],
        university: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '학사', items: [{ value: 'enrollment', name: '수강신청' }, { value: 'grade', name: '성적 조회' }, { value: 'schedule', name: '학사 일정' }, { value: 'evaluation', name: '강의 평가' }] },
            { group: '시설', items: [{ value: 'library', name: '도서관' }, { value: 'facility_booking', name: '시설 예약' }, { value: 'dormitory', name: '기숙사' }, { value: 'cafeteria', name: '학생식당' }] },
            { group: '증명', items: [{ value: 'certificate', name: '증명서 발급' }, { value: 'student_id', name: '학생증' }, { value: 'scholarship', name: '장학금' }] },
            { group: '커뮤니티', items: [{ value: 'board', name: '게시판' }, { value: 'club', name: '동아리' }, { value: 'career', name: '취업 정보' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_student', name: '학생 관리' }] }
        ],
        // B2B
        b2b_commerce: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'company_verify', name: '기업 인증' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '상품', items: [{ value: 'product_search', name: '상품 검색' }, { value: 'category', name: '카테고리' }, { value: 'moq', name: 'MOQ 설정' }, { value: 'sample', name: '샘플 요청' }] },
            { group: '견적', items: [{ value: 'rfq', name: 'RFQ 요청' }, { value: 'quote', name: '견적서' }, { value: 'negotiation', name: '가격 협상' }] },
            { group: '주문', items: [{ value: 'order', name: '주문' }, { value: 'bulk_order', name: '대량 주문' }, { value: 'payment', name: '결제' }, { value: 'tax_invoice', name: '세금계산서' }] },
            { group: '관리', items: [{ value: 'inventory', name: '재고 관리' }, { value: 'partner', name: '거래처 관리' }, { value: 'settlement', name: '정산' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }] }
        ],
        saas: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '서비스', items: [{ value: 'service_intro', name: '서비스 소개' }, { value: 'pricing', name: '요금제' }, { value: 'free_trial', name: '무료 체험' }] },
            { group: '구독', items: [{ value: 'subscription', name: '구독' }, { value: 'payment', name: '결제' }, { value: 'upgrade', name: '업그레이드' }] },
            { group: '워크스페이스', items: [{ value: 'dashboard', name: '대시보드' }, { value: 'team', name: '팀 관리' }, { value: 'permission', name: '권한 관리' }, { value: 'workspace', name: '워크스페이스' }] },
            { group: '연동', items: [{ value: 'api', name: 'API' }, { value: 'integration', name: '연동 설정' }, { value: 'webhook', name: '웹훅' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_customer', name: '고객 관리' }, { value: 'admin_usage', name: '사용량 분석' }] }
        ],
        manufacturing: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '제품', items: [{ value: 'catalog', name: '제품 카탈로그' }, { value: 'spec', name: '제품 스펙' }, { value: 'tech_doc', name: '기술 문서' }, { value: 'certification', name: '인증서' }] },
            { group: '견적', items: [{ value: 'quote_request', name: '견적 요청' }, { value: 'quote', name: '견적서' }, { value: 'sample', name: '샘플 요청' }] },
            { group: '생산', items: [{ value: 'order', name: '주문' }, { value: 'production', name: '생산 현황' }, { value: 'quality', name: '품질 관리' }, { value: 'oem_odm', name: 'OEM/ODM' }] },
            { group: '물류', items: [{ value: 'logistics', name: '물류 추적' }, { value: 'inventory', name: '재고 관리' }, { value: 'export_import', name: '수출입' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_order', name: '주문 관리' }, { value: 'admin_production', name: '생산 관리' }] }
        ],
        logistics: [
            { group: '회원', items: [{ value: 'signup', name: '회원가입' }, { value: 'login', name: '로그인' }, { value: 'mypage', name: '마이페이지' }] },
            { group: '배송', items: [{ value: 'tracking', name: '배송 조회' }, { value: 'shipping_booking', name: '운송 예약' }, { value: 'realtime_tracking', name: '실시간 추적' }] },
            { group: '견적', items: [{ value: 'quote_calc', name: '견적 산출' }, { value: 'quote', name: '견적서' }] },
            { group: '창고', items: [{ value: 'warehouse', name: '창고 관리' }, { value: 'inbound', name: '입고 관리' }, { value: 'outbound', name: '출고 관리' }, { value: 'inventory', name: '재고 현황' }] },
            { group: '관리', items: [{ value: 'dispatch', name: '배차 관리' }, { value: 'driver', name: '기사 관리' }, { value: 'return', name: '반품 관리' }, { value: 'settlement', name: '정산' }] },
            { group: '관리자', items: [{ value: 'admin_dashboard', name: '관리자 대시보드' }, { value: 'admin_logistics', name: '물류 관리' }, { value: 'admin_report', name: '리포트' }] }
        ]
    };

    // 기능 유형별 상세 옵션 데이터
    const funcTypeOptions = {
        // 회원 관리
        signup: ['소셜 로그인 포함', '본인인증 포함', '14세 미만 가입 제한', '이메일 인증', 'SMS 인증', '마케팅 수신 동의', '추천인 코드'],
        login: ['소셜 로그인', '자동 로그인', '생체인증', '2단계 인증', '비밀번호 찾기', '아이디 찾기', '로그인 기록 관리'],
        mypage: ['주문내역', '배송조회', '위시리스트', '쿠폰함', '적립금', '회원정보 수정', '배송지 관리', '리뷰 관리'],
        membership: ['회원등급제', '등급별 혜택', '승급 기준', 'VIP 전용관', '등급 유지 조건', '멤버십 카드'],
        vip_membership: ['VIP 전용관', '전담 컨시어지', '프라이빗 세일', '우선 배송', '특별 이벤트', 'VIP 라운지'],
        withdrawal: ['탈퇴 사유 수집', '탈퇴 후 재가입 제한', '데이터 삭제 정책', '탈퇴 철회 기간'],
        identity_verify: ['휴대폰 본인인증', '아이핀 인증', '공동인증서', '간편인증(카카오/PASS)', '생체인증', '신분증 OCR'],
        security_auth: ['OTP 인증', '생체인증', '패턴/PIN', '기기 등록', '로그인 알림', '이상 접근 탐지'],
        profile: ['프로필 사진', '닉네임 설정', '자기소개', '관심사 태그', '프로필 공개 설정', '차단 관리'],
        child_profile: ['아이 정보 등록', '생년월일', '성별', '키/몸무게', '알레르기 정보', '성장 앨범'],
        pet_profile: ['반려동물 종류', '이름/나이', '품종', '중성화 여부', '알레르기/건강정보', '프로필 사진'],
        company_verify: ['사업자등록증 인증', '기업 정보 입력', '담당자 정보', '결제 담당자', '세금계산서 정보', '거래처 등록'],
        
        // 상품/서비스
        product: ['상품 등록', '재고 관리', '옵션 관리', '상품 복사', '대량 등록', '상품 노출 설정', 'SEO 설정'],
        category: ['카테고리 계층 구조', '카테고리별 필터', '카테고리 정렬', '카테고리 이미지'],
        search: ['키워드 검색', '필터 검색', '자동완성', '인기 검색어', '최근 검색어', '연관 검색어', 'AI 추천'],
        size_guide: ['사이즈표', '실측 정보', '모델 정보', 'AI 사이즈 추천', '사이즈 비교', '착용 후기 연동'],
        styling: ['AI 스타일 분석', '체형별 추천', '컬러 매칭', '트렌드 반영', '코디 세트 추천', '스타일리스트 Pick'],
        virtual_fitting: ['AR 가상 피팅', '사진 업로드', '체형 인식', '다각도 미리보기', '저장/공유', '구매 연동'],
        skin_diagnosis: ['AI 피부 분석', '사진 촬영 가이드', '피부 타입 진단', '트러블 분석', '맞춤 제품 추천', '진단 히스토리'],
        virtual_makeup: ['AR 메이크업', '실시간 적용', '제품별 발색', '룩 저장', 'SNS 공유', '바로 구매'],
        ingredient: ['성분 목록', '성분 효능', '주의 성분', '피부타입별 적합도', '유사 제품 비교', 'EWG 등급'],
        spec_compare: ['제품 스펙 비교', '최대 4개 비교', '차이점 하이라이트', '항목별 필터', '비교 결과 저장', '구매 연동'],
        compatibility: ['기기 호환성 체크', '모델 선택', '호환 제품 목록', '연결 가이드', '추천 액세서리'],
        '3d_viewer': ['360도 회전', '확대/축소', '색상 변경', '소재 확인', '치수 표시', '스크린샷'],
        ar_placement: ['AR 배치 시뮬레이션', '공간 인식', '사이즈 조절', '다각도 확인', '저장/공유', '구매 연동'],
        size_simulation: ['공간 사이즈 입력', '제품 배치', '동선 확인', '조합 시뮬레이션', '결과 저장'],
        nutrition: ['영양성분표', '1일 권장량 비율', '알레르기 정보', '원산지', '유통기한', '보관방법'],
        allergy: ['알레르기 성분 표시', '성분 필터', '안전 제품 추천', '경고 알림', '성분 비교'],
        recipe: ['레시피 검색', '재료 목록', '조리 과정', '영상 가이드', '난이도 표시', '저장/공유'],
        
        // 구매/결제
        cart: ['수량 변경', '옵션 변경', '품절 상품 알림', '장바구니 유효기간', '비회원 장바구니', '선물하기'],
        wishlist: ['폴더 분류', '재입고 알림', '가격 변동 알림', '공유 기능'],
        order: ['일반 주문', '바로 구매', '선물 주문', '해외 주문', '대량 주문', '비회원 주문'],
        payment: ['신용카드', '간편결제', '계좌이체', '가상계좌', '휴대폰 결제', '포인트 결제', '복합 결제', '해외 결제'],
        delivery: ['배송조회', '배송지 변경', '출고 전 취소', '예약 배송', '새벽 배송', '당일 배송', '해외 배송'],
        fresh_delivery: ['신선배송', '온도 관리', '도착 시간 지정', '부재시 조치', '신선도 보장', '냉장/냉동 선택'],
        return: ['반품 신청', '교환 신청', '환불 처리', '반품 배송비', '불량품 처리', '부분 반품'],
        subscription: ['정기배송 주기', '구독 일시정지', '구독 해지', '구독 상품 변경', '다음 배송일 변경', '구독 혜택'],
        rental: ['렌탈 기간 선택', '렌탈료 안내', '중도 해지', '소유권 전환', '정기 점검', '교체 서비스'],
        custom_order: ['맞춤 제작 옵션', '견적 산출', '제작 기간', '시안 확인', '수정 요청', '제작 현황'],
        gift: ['선물 포장', '선물 메시지', '수령인 정보', '배송일 지정', '선물함', '답례 기능'],
        preorder: ['사전예약 신청', '예약금 결제', '출시 알림', '예약 혜택', '예약 취소', '자동 결제'],
        
        // 예약/신청
        booking: ['날짜/시간 선택', '인원 선택', '예약 확인', '예약 취소', '예약 변경', '노쇼 정책', '대기 예약'],
        class_booking: ['수업 선택', '일정 확인', '강사 선택', '정원 확인', '예약 확인', '출석 체크'],
        pt_booking: ['트레이너 선택', '가능 시간 조회', '횟수 차감', '예약 변경', '노쇼 정책', '리뷰 작성'],
        designer_select: ['디자이너 프로필', '포트폴리오', '가격표', '예약 가능 시간', '지명 예약', '리뷰 확인'],
        service_select: ['시술 메뉴', '소요 시간', '가격 안내', '옵션 선택', '추가 시술', '패키지 할인'],
        table_select: ['테이블 배치도', '좌석 선택', '인원수 설정', '특별 요청', '프라이빗룸', '좌석 유형'],
        waiting: ['원격 줄서기', '대기 순번 확인', '예상 대기시간', '호출 알림', '취소', '방문 확인'],
        consultation: ['상담 유형 선택', '희망 일시', '상담 내용 입력', '상담사 배정', '상담 결과', '후속 상담'],
        visit_booking: ['방문 희망일 선택', '시간 선택', '연락처 입력', '방문 목적', '예약 확인', '리마인드 알림'],
        schedule: ['캘린더 보기', '일정 등록', '일정 알림', '일정 공유', '반복 일정'],
        application: ['신청서 양식', '첨부파일', '신청 상태', '신청 내역', '승인/반려', '추가 정보 요청'],
        
        // 건강/의료
        doctor_search: ['진료과 선택', '의료진 검색', '전문 분야', '진료 스케줄', '평점/리뷰', '경력 정보'],
        telemedicine: ['화상 진료 신청', '증상 입력', '대기실 입장', '화상 연결', '처방전 발급', '진료 기록'],
        medical_record: ['진료 내역 조회', '처방전 조회', '검사 결과', '진단서 발급', '의료 기록 공유', '병원 연동'],
        prescription: ['처방전 조회', '복약 안내', '처방 이력', '약국 검색', '약 배송', '복약 알림'],
        health_checkup: ['검진 프로그램', '검진 예약', '검진 결과', '이상 소견 안내', '추적 관찰', '건강 리포트'],
        ai_symptom: ['증상 입력', 'AI 분석', '예상 질환', '진료과 추천', '병원 연결', '주의사항 안내'],
        health_record: ['건강 지표 입력', '측정 기록', '추이 그래프', '목표 설정', '이상 알림', '공유 기능'],
        vet_consult: ['반려동물 정보', '증상 입력', '수의사 매칭', '상담 예약', '진료 기록', '처방 안내'],
        vaccination: ['접종 일정', '접종 기록', '다음 접종 알림', '접종 증명서', '병원 예약 연동'],
        
        // 운동/피트니스
        exercise_log: ['운동 종류', '시간/세트', '칼로리 소모', '운동 루틴', '통계 그래프', '목표 달성률'],
        body_check: ['신체 측정', '인바디 연동', '체성분 분석', '변화 추이', '목표 설정', '리포트 출력'],
        diet: ['식단 기록', '칼로리 계산', '영양소 분석', '식단 추천', '물 섭취량', '목표 관리'],
        ai_coaching: ['운동 추천', '자세 교정', '루틴 생성', '피드백', '목표 조정', '동기부여 메시지'],
        challenge: ['챌린지 참여', '인증 업로드', '순위 확인', '보상 지급', '그룹 챌린지', '히스토리'],
        attendance: ['QR 출석', '자동 출석', '출석 현황', '출석률 통계', '출결 알림', '보상 연동'],
        locker: ['락커 배정', '번호 확인', '이용 기간', '락커 변경', '추가 대여', '반납 처리'],
        realtime_status: ['현재 이용 인원', '혼잡도 표시', '기구별 현황', '시간대별 추이', '알림 설정'],
        membership_purchase: ['회원권 종류', '기간 선택', '가격 안내', '할인 적용', '결제', '이용 시작일'],
        membership_manage: ['회원권 정보', '잔여 기간', '일시정지', '연장', '양도', '환불'],
        
        // 교육/학습
        course_search: ['강좌 검색', '카테고리', '난이도', '수강 후기', '강사 정보', '커리큘럼'],
        enrollment: ['수강 신청', '수강료 확인', '할인 적용', '결제', '수강 기간', '환불 정책'],
        online_lecture: ['영상 재생', '배속 조절', '구간 반복', '북마크', '자막', '진도 저장'],
        live_class: ['실시간 입장', '카메라/마이크', '채팅', '화면 공유', '손들기', '녹화본 제공'],
        assignment: ['과제 확인', '파일 업로드', '제출 기한', '피드백 확인', '재제출', '성적 반영'],
        quiz: ['퀴즈 응시', '제한 시간', '문제 유형', '결과 확인', '오답 노트', '재응시'],
        progress: ['진도율 확인', '수강 현황', '학습 통계', '예상 완료일', '독려 알림', '수료 조건'],
        certificate: ['수료 조건 확인', '수료증 발급', '디지털 배지', '공유', '출력', '검증 링크'],
        grade: ['성적 조회', '항목별 점수', '석차', '성적 추이', '성적표 발급', '이의 신청'],
        study_group: ['스터디 개설', '멤버 모집', '일정 관리', '자료 공유', '채팅', '출석 체크'],
        
        // 여행
        flight_booking: ['항공편 검색', '날짜 선택', '좌석 등급', '가격 비교', '옵션 선택', '예약 완료'],
        hotel_booking: ['숙소 검색', '날짜/인원', '객실 선택', '편의시설', '가격 비교', '예약 완료'],
        package_booking: ['패키지 검색', '일정 확인', '포함 내역', '옵션 선택', '가격 확인', '예약'],
        tour_booking: ['투어 검색', '일정/시간', '언어 선택', '픽업 정보', '가격', '예약'],
        rental_car: ['차량 검색', '대여/반납 장소', '차종 선택', '보험 선택', '옵션', '예약'],
        travel_info: ['여행지 정보', '날씨', '환율', '비자', '주의사항', '추천 일정'],
        insurance: ['보험 상품', '보장 내용', '보험료', '가입', '청구', '증명서'],
        mileage: ['마일리지 조회', '적립 내역', '사용 내역', '유효기간', '등급 혜택', '사용처'],
        exchange_rate: ['실시간 환율', '환율 계산', '환율 알림', '환전 예약', '우대율 안내'],
        
        // 부동산
        property_search: ['매물 검색', '조건 필터', '지역 선택', '가격대', '면적', '매물 유형'],
        map_search: ['지도 검색', '위치 기반', '교통 정보', '주변 시설', '학군 정보', '매물 핀'],
        price_info: ['시세 조회', '실거래가', '호가', '시세 추이', '지역 비교', '전망'],
        real_price: ['실거래가 조회', '거래 일자', '층/면적', '단지 정보', '거래 추이'],
        area_info: ['주변 정보', '교통', '학군', '편의시설', '개발 계획', '생활 인프라'],
        agent_consult: ['중개사 검색', '프로필 확인', '상담 신청', '매물 문의', '리뷰 확인', '중개 수수료'],
        '3d_tour': ['3D 투어', '360도 뷰', '실내 둘러보기', '층별 이동', '면적 확인', '저장/공유'],
        vr_tour: ['VR 견학', 'VR 기기 연동', '공간 체험', '가구 배치', '저장/공유'],
        contract: ['계약 진행', '계약서 작성', '서류 제출', '계약금 결제', '일정 관리', '완료 확인'],
        loan_consult: ['대출 상담', '한도 조회', '금리 비교', '상환 계획', '서류 안내', '신청'],
        
        // 금융
        account_link: ['계좌 연결', '은행 선택', 'ARS 인증', '계좌 별칭', '대표 계좌', '연결 해제'],
        account_view: ['계좌 조회', '잔액 확인', '계좌 상세', '거래 내역', '이체 한도', '알림 설정'],
        transaction: ['거래 내역', '기간 조회', '유형 필터', '검색', '엑셀 다운로드', '메모'],
        transfer: ['계좌 이체', '받는 분', '금액 입력', '이체 확인', '예약 이체', '자동 이체'],
        asset_management: ['자산 현황', '자산 배분', '수익률', '포트폴리오', '리밸런싱', '목표 설정'],
        portfolio: ['포트폴리오 현황', '자산별 비중', '수익률 분석', '리스크 분석', '추천 포트폴리오'],
        ai_advisor: ['AI 진단', '투자 성향', '맞춤 추천', '리밸런싱 제안', '시장 분석', '알림'],
        investment: ['투자 상품', '펀드', '주식', 'ETF', '채권', '수익률 비교'],
        
        // 미디어/콘텐츠
        article_search: ['기사 검색', '키워드', '날짜 범위', '카테고리', '기자', '정렬'],
        video_news: ['영상 뉴스', '실시간', '카테고리', '자동 재생', '공유', '저장'],
        podcast: ['팟캐스트', '에피소드', '구독', '다운로드', '재생 목록', '속도 조절'],
        ai_summary: ['AI 요약', '핵심 내용', '키워드 추출', '관련 기사', '원문 보기'],
        personalized: ['맞춤 뉴스', '관심사 설정', 'AI 추천', '피드 커스텀', '관심 기자'],
        newsletter: ['뉴스레터 구독', '발송 주기', '카테고리', '구독 해지', '지난 호 보기'],
        
        // 엔터테인먼트/OTT
        content_search: ['콘텐츠 검색', '장르', '연도', '평점', '배우/감독', '태그'],
        music: ['음악 재생', '플레이리스트', '가사', '음질 설정', '다운로드', '공유'],
        video: ['영상 재생', '해상도', '자막', '배속', '다음 에피소드', 'PIP'],
        live: ['라이브 방송', '실시간 채팅', '후원', '알림', '다시보기', '클립'],
        watch: ['콘텐츠 시청', '이어보기', '화질 선택', '자막 설정', '오디오 선택', '스킵'],
        download: ['다운로드', '화질 선택', '저장 위치', '유효 기간', '삭제', '오프라인 재생'],
        playlist: ['플레이리스트', '생성/편집', '공유', '협업', '스마트 리스트', '정렬'],
        like: ['좋아요', '좋아요 목록', '좋아요 알림', '추천 반영', '숨기기'],
        comment: ['댓글 작성', '대댓글', '좋아요', '신고', '수정/삭제', '정렬'],
        share: ['공유하기', 'SNS 공유', '링크 복사', '카카오톡', '메시지', '이메일'],
        fan_community: ['팬 게시판', '투표', '일정', '사진첩', '팬아트', '기념일'],
        vote: ['투표 참여', '투표 생성', '결과 확인', '투표권', '순위', '히스토리'],
        goods_shop: ['굿즈 구매', '상품 목록', '카테고리', '예약 구매', '배송', '리뷰'],
        
        // 커뮤니티
        post: ['글 작성', '이미지/영상', '태그', '공개 범위', '수정/삭제', '임시저장'],
        follow: ['팔로우', '팔로잉 목록', '팔로워 목록', '추천 팔로우', '차단', '알림'],
        message: ['메시지 전송', '읽음 확인', '파일 첨부', '그룹 채팅', '알림', '차단'],
        group: ['그룹 생성', '멤버 관리', '게시판', '채팅', '일정', '공지'],
        trending: ['트렌딩', '실시간 인기', '주간 베스트', '해시태그', '추천 콘텐츠'],
        hashtag: ['해시태그 검색', '인기 태그', '태그 팔로우', '태그 추천', '관련 게시물'],
        report: ['신고하기', '신고 유형', '신고 내용', '처리 결과', '차단 연동'],
        
        // 공공/기관
        civil_application: ['민원 신청', '민원 유형', '첨부 서류', '신청 내역', '처리 현황', '결과 확인'],
        document_issue: ['서류 발급', '서류 종류', '용도 선택', '수령 방법', '발급 이력', '진위 확인'],
        civil_status: ['민원 조회', '진행 상태', '처리 일정', '담당자 정보', '추가 제출', '알림'],
        e_approval: ['전자결재', '결재 요청', '결재선', '반려/승인', '결재 이력', '위임'],
        policy: ['정책 정보', '분야별 검색', '대상별 검색', '신청 방법', '관련 서류', '담당 기관'],
        participation: ['국민 참여', '의견 제출', '정책 제안', '설문 조사', '공청회', '결과 공개'],
        statistics: ['통계 조회', '분야별', '기간별', '지역별', '시각화', '다운로드'],
        
        // 비영리/협회
        donation: ['후원하기', '후원 금액', '결제 방법', '정기/일시', '후원 내역', '영수증'],
        regular_donation: ['정기후원', '금액 설정', '결제일', '변경', '해지', '내역 조회'],
        campaign: ['캠페인', '참여하기', '공유', '후원', '진행 현황', '결과 보고'],
        volunteer: ['봉사 신청', '봉사 검색', '일정 확인', '신청 내역', '시간 인증', '확인서'],
        transparency: ['투명성 보고', '자금 사용 내역', '사업 보고서', '감사 보고', '공시'],
        membership_apply: ['가입 신청', '가입 유형', '자격 확인', '심사', '승인', '회원증'],
        fee_payment: ['회비 납부', '회비 안내', '납부 방법', '납부 내역', '영수증', '미납 알림'],
        event_apply: ['행사 신청', '행사 목록', '신청서', '참가비', '신청 확인', '일정 알림'],
        library: ['자료실', '자료 검색', '카테고리', '다운로드', '업로드', '자료 요청'],
        
        // B2B
        rfq: ['견적 요청', '요청서 작성', '첨부 파일', '납기', '발송', '응답 관리'],
        quote: ['견적서', '견적 작성', '품목 등록', '조건 설정', '발송', '협상'],
        bulk_order: ['대량 주문', '품목 선택', '수량 입력', '배송 일정', '견적', '계약'],
        tax_invoice: ['세금계산서', '발행', '수신', '내역 조회', '수정 발행', '마감'],
        inventory: ['재고 관리', '재고 현황', '입출고', '재고 알림', '발주 연동', '리포트'],
        partner: ['거래처 관리', '거래처 등록', '담당자 정보', '거래 이력', '평가', '계약 관리'],
        settlement: ['정산', '정산 내역', '기간 선택', '상세 내역', '정산 요청', '정산서'],
        
        // SaaS
        service_intro: ['서비스 소개', '주요 기능', '사용 사례', '데모', '비교표', '문의'],
        pricing: ['요금제', '요금 비교', '기능 비교', '연/월 결제', '엔터프라이즈', '문의'],
        free_trial: ['무료 체험', '체험 신청', '체험 기간', '기능 제한', '유료 전환', '체험 연장'],
        dashboard: ['대시보드', '주요 지표', '차트', '커스텀', '기간 설정', '내보내기'],
        team: ['팀 관리', '멤버 초대', '역할 설정', '권한', '활동 로그', '멤버 삭제'],
        permission: ['권한 관리', '역할 정의', '권한 설정', '접근 제어', '로그', '상속'],
        workspace: ['워크스페이스', '생성', '설정', '멤버', '삭제', '전환'],
        api: ['API 연동', 'API 키', '문서', '테스트', '사용량', '웹훅'],
        integration: ['연동 설정', '외부 서비스', '인증', '동기화', '연동 해제', '로그'],
        webhook: ['웹훅', '엔드포인트', '이벤트 선택', '테스트', '로그', '재시도'],
        usage: ['사용량', '기간별', '기능별', '한도', '알림', '리포트'],
        
        // 제조/물류
        catalog: ['제품 카탈로그', '제품 검색', '스펙', '인증', '다운로드', '문의'],
        spec: ['제품 스펙', '상세 정보', '비교', '인증서', '사용 가이드'],
        tech_doc: ['기술 문서', '매뉴얼', '도면', 'MSDS', '인증서', '다운로드'],
        production: ['생산 현황', '공정별', '일정', '진행률', '이슈', '리포트'],
        quality: ['품질 관리', '검사 기준', '검사 결과', '불량 처리', '리포트', '인증'],
        oem_odm: ['OEM/ODM', '제작 문의', '견적', '샘플', '계약', '생산 관리'],
        logistics: ['물류 추적', '운송 현황', '위치 추적', '도착 예정', '이력', '알림'],
        export_import: ['수출입', '통관', '서류', '일정', '비용', '이력'],
        tracking: ['배송 조회', '운송장 번호', '실시간 위치', '배송 상태', '배송 완료', '알림'],
        shipping_booking: ['운송 예약', '출발/도착', '물품 정보', '견적', '예약 확인', '취소'],
        realtime_tracking: ['실시간 추적', 'GPS', '경로', 'ETA', '이벤트', '알림'],
        quote_calc: ['견적 산출', '물품 정보', '경로', '옵션', '계산', '견적서'],
        warehouse: ['창고 관리', '입고', '출고', '재고', '위치', '리포트'],
        inbound: ['입고 관리', '입고 예정', '검수', '적치', '입고 완료', '리포트'],
        outbound: ['출고 관리', '출고 지시', '피킹', '검수', '출고 완료', '리포트'],
        dispatch: ['배차 관리', '차량 배정', '경로 설정', '기사 배정', '일정', '현황'],
        driver: ['기사 관리', '기사 정보', '배차 현황', '운행 기록', '정산', '평가'],
        
        // 관리자
        admin_dashboard: ['주요 지표', '실시간 현황', '매출 통계', '회원 통계', '주문 통계', '알림'],
        admin_user: ['회원 목록', '회원 상세', '등급 변경', '포인트 지급', '휴면 처리', '탈퇴 처리'],
        admin_order: ['주문 목록', '주문 상세', '주문 상태 변경', '배송 처리', '취소/환불 처리', '일괄 처리'],
        admin_booking: ['예약 목록', '예약 상세', '예약 상태', '알림 발송', '노쇼 처리', '통계'],
        admin_content: ['콘텐츠 관리', '등록/수정', '노출 설정', '카테고리', '태그', '통계'],
        admin_stats: ['매출 리포트', '상품 분석', '회원 분석', '기간별 비교', '엑셀 다운로드'],
        admin_member: ['회원 관리', '회원권', '출석', '예약', '포인트', '알림'],
        admin_designer: ['디자이너 관리', '프로필', '스케줄', '예약 현황', '매출', '평가'],
        admin_customer: ['고객 관리', '고객 목록', '상세 정보', '구독 현황', '결제 이력', '문의'],
        admin_project: ['프로젝트 관리', '목록', '진행 현황', '일정', '리소스', '리포트'],
        admin_donation: ['후원 관리', '후원자 목록', '후원 내역', '정기후원', '영수증', '리포트'],
        admin_civil: ['민원 관리', '민원 목록', '처리 현황', '담당 배정', '통계', '리포트'],
        admin_patient: ['환자 관리', '환자 목록', '진료 이력', '예약 현황', '처방', '통계'],
        admin_course: ['강좌 관리', '강좌 목록', '수강생', '평가', '통계', '설정'],
        admin_student: ['학생 관리', '학생 목록', '수강 현황', '성적', '출석', '상담'],
        admin_property: ['매물 관리', '매물 등록', '상태 변경', '문의 관리', '통계', '리포트'],
        admin_job: ['공고 관리', '공고 등록', '지원자 현황', '면접 일정', '통계', '설정'],
        admin_applicant: ['지원자 관리', '지원서 목록', '평가', '면접 일정', '합격 처리', '통보'],
        admin_logistics: ['물류 관리', '운송 현황', '창고 현황', '정산', '기사 관리', '리포트'],
        admin_production: ['생산 관리', '생산 일정', '공정 현황', '품질', '재고', '리포트'],
        admin_report: ['리포트', '유형 선택', '기간', '필터', '생성', '다운로드'],
        admin_usage: ['사용량 분석', '기간별', '고객별', '기능별', '한도 관리', '알림'],
        admin_as: ['A/S 관리', '접수 목록', '처리 현황', '기사 배정', '부품 재고', '통계'],
        admin_vip: ['VIP 관리', 'VIP 목록', '혜택 설정', '전담 배정', '활동 이력', '등급 관리'],
        
        // 기타 공통
        notice: ['공지사항', '목록', '상세', '첨부파일', '중요 공지', '알림'],
        faq: ['FAQ', '카테고리', '검색', '상세', '도움 여부', '문의 연결'],
        chatbot: ['챗봇 상담', '자동 응답', '상담원 연결', '대화 이력', '만족도 평가'],
        store_search: ['매장 검색', '지역 선택', '지도', '매장 정보', '영업 시간', '길찾기'],
        pickup: ['픽업 예약', '매장 선택', '시간 선택', '주문 내용', '결제', '알림'],
        takeout: ['테이크아웃', '메뉴 선택', '픽업 시간', '결제', '준비 알림', '수령'],
        menu: ['메뉴 보기', '카테고리', '상세 정보', '영양 정보', '알레르기', '추천'],
        store_info: ['매장 정보', '위치', '영업 시간', '연락처', '편의시설', '사진'],
        installation: ['설치 예약', '가능일 조회', '시간 선택', '주소 확인', '예약 완료', '변경/취소'],
        as_service: ['A/S 신청', '제품 선택', '증상 입력', '사진 첨부', '접수', '진행 조회'],
        warranty: ['보증 관리', '제품 등록', '보증 기간', '보증서', '연장 신청', '보증 이력'],
        manual: ['사용 설명서', '제품 검색', '다운로드', '영상 가이드', '자주 묻는 질문'],
        authenticity: ['정품 인증', '시리얼 번호', 'QR 스캔', '인증서', '이력 조회'],
        limited_edition: ['한정판', '출시 알림', '응모', '당첨 확인', '구매', '재판매 방지'],
        concierge: ['컨시어지', '요청하기', '상담 내역', '선호도 관리', '특별 서비스'],
        private_visit: ['예약 방문', '매장 선택', '일시 선택', '요청사항', '확인', '알림'],
        after_care: ['수선/관리', '서비스 종류', '접수', '진행 조회', '완료 알림', '수령']
    };

    // 기능 유형별 기능정의서 콘텐츠
    const funcSpecContent = {
        signup: generateSignupSpec,
        login: generateLoginSpec,
        payment: generatePaymentSpec,
        cart: generateCartSpec,
        order: generateOrderSpec,
        delivery: generateDeliverySpec,
        review: generateReviewSpec,
        point: generatePointSpec,
        coupon: generateCouponSpec,
        booking: generateBookingSpec,
        subscription: generateSubscriptionSpec,
        mypage: generateMypageSpec
    };

    // 기능 유형명 (동적으로 수집)
    const funcTypeNames = {};
    Object.values(industryFuncTypes).forEach(groups => {
        groups.forEach(group => {
            group.items.forEach(item => {
                funcTypeNames[item.value] = item.name;
            });
        });
    });

    // 전체선택 체크박스
    const funcOptionSelectAll = document.getElementById('funcOptionSelectAll');
    
    // 업종별 추가 옵션 데이터
    const industrySpecificOptions = {
        fashion: ['사이즈 가이드', '코디 추천', '가상 피팅', '스타일 필터', '착용샷 리뷰'],
        beauty: ['피부 타입 선택', 'AI 맞춤 추천', '성분 분석', '가상 메이크업', '뷰티 팁'],
        fnb: ['알레르기 정보', '영양 정보', '원산지 표시', '유통기한 관리', '레시피 연동'],
        electronics: ['스펙 비교', '호환성 체크', '설치 가이드', 'A/S 연동', '사용 설명서'],
        furniture: ['3D 뷰어', 'AR 배치', '사이즈 시뮬레이션', '인테리어 상담', '배송 설치'],
        healthcare: ['보험 연동', '의료 기록', '본인인증 강화', '처방전 연동', '건강검진 연계'],
        education: ['학습 진도', '수료증 발급', '과제 제출', '실시간 수업', '학습 분석'],
        finance: ['본인인증 강화', '보안 인증', '자산 연동', '신용 조회', '계좌 연결'],
        travel: ['항공 연동', '호텔 연동', '보험 가입', '일정 공유', '환율 계산'],
        realestate: ['매물 지도', '시세 정보', 'VR 투어', '대출 상담', '계약 관리'],
        restaurant: ['웨이팅 관리', '테이블 선택', '메뉴 추천', '알레르기 필터', '결제 분리'],
        fitness: ['운동 기록', '바디 체크', 'PT 예약', '식단 관리', '출석 체크'],
        salon: ['스타일 시뮬레이션', '디자이너 포트폴리오', '시술 추천', '예약 알림', '재방문 쿠폰'],
        public: ['공인인증', '실명 인증', '전자서명', '민원 추적', '증명서 발급'],
        nonprofit: ['기부 영수증', '후원 현황', '캠페인 참여', '봉사 시간', '투명성 리포트'],
        b2b_commerce: ['기업 인증', '대량 주문', '견적서', '세금계산서', '거래처 관리'],
        saas: ['팀 관리', 'API 연동', '사용량 분석', '권한 설정', '데이터 백업']
    };

    // 기능 유형 select 업데이트 함수
    function updateFuncTypeSelect() {
        const industry = funcIndustrySelect?.value || '';
        
        if (!funcTypeSelect) return;
        
        if (!industry) {
            funcTypeSelect.innerHTML = '<option value="">업종을 먼저 선택하세요</option>';
            return;
        }
        
        const funcTypes = industryFuncTypes[industry];
        if (!funcTypes) {
            funcTypeSelect.innerHTML = '<option value="">해당 업종의 기능 유형이 없습니다</option>';
            return;
        }
        
        let html = '<option value="">기능 유형을 선택하세요</option>';
        funcTypes.forEach(group => {
            html += `<optgroup label="${group.group}">`;
            group.items.forEach(item => {
                html += `<option value="${item.value}">${item.name}</option>`;
            });
            html += '</optgroup>';
        });
        
        funcTypeSelect.innerHTML = html;
    }
    
    // 상세 옵션 업데이트 함수
    function updateFuncOptions() {
        const funcType = funcTypeSelect?.value || '';
        const industry = funcIndustrySelect?.value || '';
        
        if (!funcType) {
            if (funcOptionsContainer) {
                funcOptionsContainer.innerHTML = '<p class="empty-message">기능 유형을 선택하면 상세 옵션이 표시됩니다.</p>';
            }
            return;
        }
        
        // 기본 옵션
        let options = funcTypeOptions[funcType] || ['기본 옵션 1', '기본 옵션 2', '기본 옵션 3'];
        
        // 업종별 추가 옵션 병합
        if (industry && industrySpecificOptions[industry]) {
            const additionalOptions = industrySpecificOptions[industry];
            options = [...options, ...additionalOptions];
        }
        
        if (funcOptionsContainer) {
            funcOptionsContainer.innerHTML = options.map((option, index) => `
                <label class="checkbox-item">
                    <input type="checkbox" name="func_option" value="${option}" ${index < 3 ? 'checked' : ''}>
                    <span class="checkmark"></span>
                    <span>${option}</span>
                </label>
            `).join('');
            
            if (funcOptionSelectAll) funcOptionSelectAll.checked = false;
            initFuncOptionCheckboxEvents();
        }
    }
    
    // 상세 옵션 체크박스 이벤트
    function initFuncOptionCheckboxEvents() {
        const checkboxes = funcOptionsContainer?.querySelectorAll('input[name="func_option"]');
        checkboxes?.forEach(cb => {
            cb.addEventListener('change', updateFuncSelectAllState);
        });
    }
    
    // 전체선택 상태 업데이트
    function updateFuncSelectAllState() {
        const checkboxes = document.querySelectorAll('input[name="func_option"]');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        if (funcOptionSelectAll) funcOptionSelectAll.checked = allChecked;
    }
    
    // 전체선택 이벤트
    funcOptionSelectAll?.addEventListener('change', (e) => {
        document.querySelectorAll('input[name="func_option"]').forEach(cb => cb.checked = e.target.checked);
    });

    // 업종 변경 시 기능 유형 업데이트
    funcIndustrySelect?.addEventListener('change', () => {
        updateFuncTypeSelect();
        updateFuncOptions();
    });

    // 기능 유형 변경 시 옵션 업데이트
    funcTypeSelect?.addEventListener('change', updateFuncOptions);
    
    // 초기 상태
    updateFuncTypeSelect();
    updateFuncOptions();
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const funcType = funcTypeSelect?.value || 'signup';
        const industry = funcIndustrySelect?.value || 'commerce';
        const selectedOptions = Array.from(document.querySelectorAll('input[name="func_option"]:checked')).map(cb => cb.value);
        
        // 타이틀 업데이트
        if (funcResultTitle) {
            funcResultTitle.innerHTML = `
                <span class="ai-badge">AI</span>
                ${funcTypeNames[funcType] || funcType} 기능정의서 초안
            `;
        }
        
        // 콘텐츠 업데이트
        if (funcResultContent) {
            if (funcSpecContent[funcType]) {
                funcResultContent.innerHTML = funcSpecContent[funcType](industry, selectedOptions);
            } else {
                // 범용 기능정의서 생성
                funcResultContent.innerHTML = generateGenericFuncSpec(funcType, funcTypeNames[funcType] || funcType, industry, selectedOptions);
            }
        }
        
        if (resultCard) {
            resultCard.style.animation = 'none';
            resultCard.offsetHeight;
            resultCard.style.animation = 'fadeIn 0.5s ease';
            
            // Animate sections
            const sections = resultCard.querySelectorAll('.func-section, .func-journey');
            sections.forEach((section, index) => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    section.style.transition = 'all 0.4s ease';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    });
}

// 회원가입 기능정의서 생성
function generateSignupSpec(industry, options) {
    const hasSocialLogin = options.includes('소셜 로그인 포함') || options.includes('소셜 로그인');
    const hasIdentityVerify = options.includes('본인인증 포함') || options.includes('본인인증');
    const hasEmailVerify = options.includes('이메일 인증');
    const hasSmsVerify = options.includes('SMS 인증');
    const hasMarketing = options.includes('마케팅 수신 동의');
    const hasReferral = options.includes('추천인 코드');
    const hasAgeLimit = options.includes('14세 미만 가입 제한');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-MEM-001</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">진입</span><p>회원가입 버튼 클릭<br><small>• GNB/로그인 페이지에서 진입</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">가입방식 선택</span><p>이메일/소셜 선택<br><small>• 소셜: 카카오, 네이버, 구글</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">약관동의</span><p>필수/선택 약관 확인<br><small>• 개인정보처리방침, 이용약관</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">정보입력</span><p>회원정보 입력<br><small>• 이메일, 비밀번호, 이름, 휴대폰</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">5</span><span class="step-title">인증</span><p>${hasIdentityVerify ? '본인인증' : hasSmsVerify ? 'SMS 인증' : hasEmailVerify ? '이메일 인증' : '인증 진행'}<br><small>• 인증번호 발송 및 확인</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">6</span><span class="step-title">완료</span><p>가입 완료<br><small>• 웰컴 쿠폰/포인트 지급</small></p></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 신규 사용자가 서비스를 이용하기 위해 계정을 생성하는 기능</p>
                <p><strong>접근 경로:</strong> 메인 > GNB 회원가입 버튼 / 로그인 페이지 > 회원가입 링크 / 비회원 주문 > 회원가입 유도</p>
                <p><strong>권한:</strong> 비로그인 사용자</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 화면 구성 (Screen Layout)</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>2.1 가입방식 선택 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[버튼]</span> 이메일로 가입하기</div>
                        ${hasSocialLogin ? `
                        <div class="element"><span class="el-type">[버튼]</span> 카카오로 시작하기</div>
                        <div class="element"><span class="el-type">[버튼]</span> 네이버로 시작하기</div>
                        <div class="element"><span class="el-type">[버튼]</span> 구글로 시작하기</div>
                        <div class="element"><span class="el-type">[버튼]</span> 애플로 시작하기 (iOS)</div>` : ''}
                        <div class="element"><span class="el-type">[링크]</span> 이미 계정이 있으신가요? 로그인</div>
                    </div>
                </div>
                <div class="screen-item">
                    <h5>2.2 약관동의 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[체크박스]</span> 전체 동의</div>
                        <div class="element"><span class="el-type">[체크박스]</span> 이용약관 동의 (필수) + 내용보기</div>
                        <div class="element"><span class="el-type">[체크박스]</span> 개인정보 수집 및 이용 동의 (필수) + 내용보기</div>
                        ${hasAgeLimit ? `<div class="element"><span class="el-type">[체크박스]</span> 만 14세 이상입니다 (필수)</div>` : ''}
                        ${hasMarketing ? `<div class="element"><span class="el-type">[체크박스]</span> 마케팅 정보 수신 동의 (선택) + 내용보기</div>` : ''}
                        <div class="element"><span class="el-type">[버튼]</span> 다음 (필수 약관 동의 시 활성화)</div>
                    </div>
                </div>
                <div class="screen-item">
                    <h5>2.3 정보입력 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[입력]</span> 이메일 (아이디) + 중복확인 버튼</div>
                        <div class="element"><span class="el-type">[입력]</span> 비밀번호 + 보기/숨기기 토글</div>
                        <div class="element"><span class="el-type">[입력]</span> 비밀번호 확인</div>
                        <div class="element"><span class="el-type">[입력]</span> 이름</div>
                        <div class="element"><span class="el-type">[입력]</span> 휴대폰 번호 + 인증요청 버튼</div>
                        <div class="element"><span class="el-type">[입력]</span> 인증번호 입력 (인증요청 후 표시)</div>
                        ${hasReferral ? `<div class="element"><span class="el-type">[입력]</span> 추천인 코드 (선택)</div>` : ''}
                        <div class="element"><span class="el-type">[버튼]</span> 가입완료</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>3. 회원가입 방식</h4>
            <div class="func-table">
                <div class="func-row header"><span>구분</span><span>상세 내용</span><span>비고</span></div>
                <div class="func-row"><span>이메일 가입</span><span>이메일 주소를 아이디로 사용하여 직접 회원가입<br>• 이메일 형식 검증<br>• 실시간 중복 확인<br>• 비밀번호 직접 설정</span><span class="required">필수</span></div>
                ${hasSocialLogin ? `
                <div class="func-row"><span>카카오 로그인</span><span>카카오 계정 연동<br>• 이메일, 닉네임, 프로필 사진 자동 수집<br>• 추가 정보 입력 화면 이동 (휴대폰 등)</span><span class="required">필수</span></div>
                <div class="func-row"><span>네이버 로그인</span><span>네이버 계정 연동<br>• 이메일, 이름, 프로필 사진 자동 수집</span><span class="required">필수</span></div>
                <div class="func-row"><span>구글 로그인</span><span>구글 계정 연동<br>• 이메일, 이름, 프로필 사진 자동 수집</span><span class="required">필수</span></div>
                <div class="func-row"><span>애플 로그인</span><span>애플 계정 연동 (iOS/Safari)<br>• 이메일 자동 수집 (숨김처리 가능)</span><span class="optional">선택</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>4. 입력 필드 정의</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>필드명</span><span>데이터 타입</span><span>유효성 검사</span><span>필수</span></div>
                <div class="func-row"><span>이메일</span><span>VARCHAR(100)</span><span>• 이메일 형식 (정규식)<br>• 실시간 중복 확인 API<br>• 최대 100자</span><span class="required">Y</span></div>
                <div class="func-row"><span>비밀번호</span><span>VARCHAR(255)<br>(암호화)</span><span>• 8~20자<br>• 영문+숫자+특수문자 2종 이상<br>• 연속 3자 이상 금지 (111, abc)</span><span class="required">Y</span></div>
                <div class="func-row"><span>비밀번호 확인</span><span>-</span><span>• 비밀번호와 일치 여부 확인</span><span class="required">Y</span></div>
                <div class="func-row"><span>이름</span><span>VARCHAR(50)</span><span>• 2~20자<br>• 한글 또는 영문<br>• 특수문자, 숫자 불가</span><span class="required">Y</span></div>
                <div class="func-row"><span>휴대폰번호</span><span>VARCHAR(11)</span><span>• 010 시작<br>• 숫자만 10~11자리<br>• - 자동 제거</span><span class="required">Y</span></div>
                ${hasReferral ? `<div class="func-row"><span>추천인 코드</span><span>VARCHAR(20)</span><span>• 8자리 영문+숫자<br>• 존재하는 코드인지 확인</span><span class="optional">N</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>5. 인증 방식</h4>
            <div class="func-table">
                <div class="func-row header"><span>인증 유형</span><span>프로세스</span><span>유효시간</span></div>
                ${hasSmsVerify || hasIdentityVerify ? `
                <div class="func-row"><span>SMS 인증</span><span>1. 휴대폰번호 입력 → 인증요청 클릭<br>2. 인증번호 6자리 SMS 발송<br>3. 인증번호 입력 → 확인<br>4. 일치 시 인증완료</span><span>3분</span></div>` : ''}
                ${hasEmailVerify ? `
                <div class="func-row"><span>이메일 인증</span><span>1. 이메일 입력 → 인증요청 클릭<br>2. 인증 링크 포함 이메일 발송<br>3. 링크 클릭 시 인증완료<br>4. 또는 인증코드 6자리 입력</span><span>24시간</span></div>` : ''}
                ${hasIdentityVerify ? `
                <div class="func-row"><span>본인인증</span><span>1. 본인인증 버튼 클릭<br>2. 본인인증 모듈 팝업 (NICE/PASS)<br>3. 이름, 생년월일, 휴대폰 인증<br>4. CI/DI 값 수신 및 저장</span><span>즉시</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>6. 약관 동의 항목</h4>
            <div class="func-table">
                <div class="func-row header"><span>약관명</span><span>필수여부</span><span>내용</span></div>
                <div class="func-row"><span>이용약관</span><span class="required">필수</span><span>서비스 이용에 관한 기본 약관</span></div>
                <div class="func-row"><span>개인정보 수집 및 이용</span><span class="required">필수</span><span>개인정보 수집 항목, 목적, 보유기간</span></div>
                ${hasAgeLimit ? `<div class="func-row"><span>만 14세 이상 확인</span><span class="required">필수</span><span>14세 미만 가입 제한</span></div>` : ''}
                ${hasMarketing ? `<div class="func-row"><span>마케팅 정보 수신</span><span class="optional">선택</span><span>이메일, SMS, 앱푸시 마케팅 수신</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>7. 에러 처리</h4>
            <div class="func-table">
                <div class="func-row header"><span>에러 상황</span><span>에러 메시지</span><span>처리 방법</span></div>
                <div class="func-row"><span>이메일 중복</span><span>"이미 사용 중인 이메일입니다"</span><span>로그인 페이지 이동 링크 제공</span></div>
                <div class="func-row"><span>이메일 형식 오류</span><span>"올바른 이메일 형식을 입력해주세요"</span><span>입력 필드 하단 실시간 표시</span></div>
                <div class="func-row"><span>비밀번호 불일치</span><span>"비밀번호가 일치하지 않습니다"</span><span>입력 필드 하단 실시간 표시</span></div>
                <div class="func-row"><span>비밀번호 조건 미충족</span><span>"영문, 숫자, 특수문자 중 2가지 이상 조합해주세요"</span><span>조건 충족 여부 실시간 표시</span></div>
                <div class="func-row"><span>인증번호 불일치</span><span>"인증번호가 일치하지 않습니다"</span><span>재발송 버튼 활성화</span></div>
                <div class="func-row"><span>인증시간 초과</span><span>"인증시간이 초과되었습니다"</span><span>재발송 버튼 표시</span></div>
                <div class="func-row"><span>필수항목 미입력</span><span>"필수 항목을 입력해주세요"</span><span>미입력 필드 하이라이트</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>8. 비즈니스 규칙</h4>
            <ul class="func-list">
                <li><strong>이메일 중복:</strong> 동일 이메일로 가입 불가, 탈퇴 회원 이메일도 30일간 재사용 불가</li>
                <li><strong>휴대폰 중복:</strong> 동일 휴대폰번호로 최대 3개 계정까지 가입 가능</li>
                <li><strong>소셜 연동:</strong> 이미 가입된 이메일과 소셜 이메일 동일 시 계정 연동 안내</li>
                <li><strong>비밀번호 정책:</strong> 3개월마다 비밀번호 변경 권장 안내</li>
                ${hasReferral ? `<li><strong>추천인 혜택:</strong> 추천인/피추천인 각각 1,000포인트 지급 (첫 구매 시)</li>` : ''}
            </ul>
        </div>

        <div class="func-section">
            <h4>9. 가입 완료 처리</h4>
            <div class="func-table">
                <div class="func-row header"><span>처리 항목</span><span>내용</span><span>발송 채널</span></div>
                <div class="func-row"><span>웰컴 쿠폰 발급</span><span>신규 가입 축하 10% 할인쿠폰 (7일 유효)</span><span>즉시 발급</span></div>
                <div class="func-row"><span>가입 포인트 지급</span><span>신규 가입 축하 1,000P (30일 유효)</span><span>즉시 지급</span></div>
                <div class="func-row"><span>가입 완료 알림</span><span>가입 완료 및 혜택 안내 메시지</span><span>이메일, SMS</span></div>
                <div class="func-row"><span>자동 로그인</span><span>가입 완료 후 자동 로그인 처리</span><span>세션 생성</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>10. API 연동</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>용도</span><span>제공사</span></div>
                <div class="func-row"><span>POST /api/auth/check-email</span><span>이메일 중복 확인</span><span>자체</span></div>
                <div class="func-row"><span>POST /api/auth/send-sms</span><span>SMS 인증번호 발송</span><span>NHN Cloud</span></div>
                ${hasIdentityVerify ? `<div class="func-row"><span>본인인증 모듈</span><span>휴대폰 본인인증</span><span>NICE평가정보</span></div>` : ''}
                ${hasSocialLogin ? `
                <div class="func-row"><span>Kakao OAuth</span><span>카카오 로그인</span><span>카카오</span></div>
                <div class="func-row"><span>Naver OAuth</span><span>네이버 로그인</span><span>네이버</span></div>
                <div class="func-row"><span>Google OAuth</span><span>구글 로그인</span><span>Google</span></div>` : ''}
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>법규 준수:</strong> 개인정보보호법, 정보통신망법, 전자상거래법 최신 기준 반영</p>
                <p><strong>UX 벤치마킹:</strong> ${industryName} 업종 Top 10 서비스 회원가입 플로우 분석</p>
                <p><strong>전환율 기준:</strong> 회원가입 완료율 평균 72% 이상 달성 목표</p>
            </div>
        </div>
    `;
}

// 로그인 기능정의서 생성
function generateLoginSpec(industry, options) {
    const hasSocialLogin = options.includes('소셜 로그인');
    const hasAutoLogin = options.includes('자동 로그인');
    const hasBiometric = options.includes('생체인증');
    const has2FA = options.includes('2단계 인증');
    const hasLoginHistory = options.includes('로그인 기록 관리');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-MEM-002</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">진입</span><p>로그인 페이지 접속<br><small>• GNB 로그인 버튼 클릭</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">방식선택</span><p>로그인 방식 선택<br><small>• 이메일/소셜 선택</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">정보입력</span><p>아이디/비밀번호 입력<br><small>• 자동입력, 아이디저장</small></p></div>
                <div class="journey-arrow">→</div>
                ${has2FA ? `<div class="journey-step"><span class="step-num">4</span><span class="step-title">2차인증</span><p>추가 인증<br><small>• OTP/SMS 인증</small></p></div><div class="journey-arrow">→</div>` : ''}
                <div class="journey-step"><span class="step-num">${has2FA ? '5' : '4'}</span><span class="step-title">검증</span><p>로그인 검증<br><small>• 계정 확인, 세션 생성</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">${has2FA ? '6' : '5'}</span><span class="step-title">완료</span><p>로그인 완료<br><small>• 메인/이전 페이지 이동</small></p></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 가입된 회원이 서비스에 인증하여 개인화된 서비스를 이용</p>
                <p><strong>접근 경로:</strong> 메인 > GNB 로그인 버튼 / 회원 전용 서비스 접근 시 / 비로그인 상태 마이페이지 접근</p>
                <p><strong>권한:</strong> 비로그인 사용자 (가입 회원)</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 화면 구성 (Screen Layout)</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>2.1 로그인 메인 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[로고]</span> 서비스 로고</div>
                        <div class="element"><span class="el-type">[입력]</span> 이메일 (아이디)</div>
                        <div class="element"><span class="el-type">[입력]</span> 비밀번호 + 보기/숨기기 토글</div>
                        <div class="element"><span class="el-type">[체크박스]</span> 아이디 저장</div>
                        ${hasAutoLogin ? `<div class="element"><span class="el-type">[체크박스]</span> 자동 로그인 (30일)</div>` : ''}
                        <div class="element"><span class="el-type">[버튼]</span> 로그인</div>
                        <div class="element"><span class="el-type">[구분선]</span> 또는</div>
                        ${hasSocialLogin ? `
                        <div class="element"><span class="el-type">[버튼]</span> 카카오로 로그인</div>
                        <div class="element"><span class="el-type">[버튼]</span> 네이버로 로그인</div>
                        <div class="element"><span class="el-type">[버튼]</span> 구글로 로그인</div>` : ''}
                        <div class="element"><span class="el-type">[링크]</span> 아이디 찾기 | 비밀번호 찾기</div>
                        <div class="element"><span class="el-type">[링크]</span> 회원가입</div>
                    </div>
                </div>
                ${has2FA ? `
                <div class="screen-item">
                    <h5>2.2 2단계 인증 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[텍스트]</span> 2단계 인증이 필요합니다</div>
                        <div class="element"><span class="el-type">[선택]</span> SMS 인증 / OTP 인증</div>
                        <div class="element"><span class="el-type">[입력]</span> 인증번호 6자리</div>
                        <div class="element"><span class="el-type">[버튼]</span> 인증 완료</div>
                        <div class="element"><span class="el-type">[링크]</span> 인증번호 재발송</div>
                    </div>
                </div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>3. 로그인 방식</h4>
            <div class="func-table">
                <div class="func-row header"><span>구분</span><span>상세 내용</span><span>비고</span></div>
                <div class="func-row"><span>이메일 로그인</span><span>이메일(아이디) + 비밀번호 입력<br>• 아이디 저장: 브라우저 LocalStorage 저장<br>• 자동 로그인: Refresh Token 발급 (30일)</span><span class="required">필수</span></div>
                ${hasSocialLogin ? `
                <div class="func-row"><span>카카오 로그인</span><span>카카오 계정으로 원클릭 로그인<br>• 기존 연동 계정 확인<br>• 미연동 시 회원가입 유도</span><span class="required">필수</span></div>
                <div class="func-row"><span>네이버 로그인</span><span>네이버 계정으로 원클릭 로그인</span><span class="required">필수</span></div>
                <div class="func-row"><span>구글 로그인</span><span>구글 계정으로 원클릭 로그인</span><span class="required">필수</span></div>` : ''}
                ${hasBiometric ? `<div class="func-row"><span>생체인증</span><span>앱에서 지문/Face ID 인증<br>• 최초 1회 일반 로그인 후 활성화</span><span class="optional">선택</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>4. 보안 정책</h4>
            <div class="func-table">
                <div class="func-row header"><span>정책</span><span>상세 내용</span><span>설정값</span></div>
                <div class="func-row"><span>로그인 실패 제한</span><span>연속 로그인 실패 시 계정 잠금<br>• 잠금 해제: 이메일 인증 또는 시간 경과</span><span>5회 실패 시 10분 잠금</span></div>
                <div class="func-row"><span>비밀번호 마스킹</span><span>입력 시 • 표시, 보기 토글 제공</span><span>기본 마스킹</span></div>
                <div class="func-row"><span>세션 관리</span><span>동시 로그인 기기 제한<br>• 초과 시 기존 세션 강제 로그아웃</span><span>최대 3대</span></div>
                <div class="func-row"><span>세션 타임아웃</span><span>무활동 시 자동 로그아웃</span><span>30분 (갱신 가능)</span></div>
                ${has2FA ? `<div class="func-row"><span>2단계 인증</span><span>로그인 성공 후 추가 인증 필요<br>• 새 기기/브라우저 로그인 시<br>• 중요 정보 접근 시</span><span>SMS/OTP</span></div>` : ''}
                ${hasLoginHistory ? `<div class="func-row"><span>로그인 기록</span><span>IP, 기기, 시간, 위치 기록<br>• 이상 접속 감지 시 알림<br>• 마이페이지에서 기록 조회 가능</span><span>최근 50건</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>5. 아이디/비밀번호 찾기</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>기능</span><span>STEP 1</span><span>STEP 2</span><span>STEP 3</span><span>결과</span></div>
                <div class="func-row"><span>아이디 찾기</span><span>이름 + 휴대폰번호 입력</span><span>SMS 인증번호 발송<br>(3분 유효)</span><span>인증번호 입력 및 확인</span><span>가입된 이메일 표시<br>(일부 마스킹: a***@gmail.com)</span></div>
                <div class="func-row"><span>비밀번호 찾기<br>(이메일)</span><span>아이디(이메일) 입력</span><span>인증 링크 포함 이메일 발송<br>(24시간 유효)</span><span>링크 클릭 → 비밀번호 재설정</span><span>새 비밀번호 설정 완료</span></div>
                <div class="func-row"><span>비밀번호 찾기<br>(SMS)</span><span>아이디 + 휴대폰번호 입력</span><span>SMS 인증번호 발송</span><span>인증번호 확인 → 비밀번호 재설정</span><span>새 비밀번호 설정 완료</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>6. 에러 처리</h4>
            <div class="func-table">
                <div class="func-row header"><span>에러 상황</span><span>에러 메시지</span><span>처리 방법</span></div>
                <div class="func-row"><span>아이디/비밀번호 불일치</span><span>"아이디 또는 비밀번호가 일치하지 않습니다"</span><span>보안상 어느 쪽이 틀렸는지 미표시</span></div>
                <div class="func-row"><span>계정 잠금</span><span>"로그인 5회 실패로 계정이 잠겼습니다. 10분 후 다시 시도해주세요"</span><span>잠금 해제 방법 안내</span></div>
                <div class="func-row"><span>탈퇴 회원</span><span>"탈퇴한 계정입니다"</span><span>재가입 안내</span></div>
                <div class="func-row"><span>휴면 계정</span><span>"휴면 상태입니다. 본인인증 후 이용 가능합니다"</span><span>휴면 해제 프로세스 안내</span></div>
                <div class="func-row"><span>미가입 회원</span><span>"가입되지 않은 이메일입니다"</span><span>회원가입 페이지 링크 제공</span></div>
                <div class="func-row"><span>소셜 연동 실패</span><span>"소셜 로그인에 실패했습니다. 다시 시도해주세요"</span><span>일반 로그인 유도</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>7. 로그인 성공 처리</h4>
            <div class="func-table">
                <div class="func-row header"><span>처리 항목</span><span>내용</span><span>비고</span></div>
                <div class="func-row"><span>토큰 발급</span><span>Access Token (1시간) + Refresh Token (30일)</span><span>JWT</span></div>
                <div class="func-row"><span>세션 생성</span><span>서버 세션 생성 및 사용자 정보 캐싱</span><span>Redis</span></div>
                <div class="func-row"><span>로그인 기록</span><span>로그인 시간, IP, 기기 정보 저장</span><span>DB 기록</span></div>
                <div class="func-row"><span>페이지 이동</span><span>이전 페이지 또는 메인 페이지로 Redirect</span><span>returnUrl 파라미터</span></div>
                <div class="func-row"><span>장바구니 동기화</span><span>비회원 장바구니 → 회원 장바구니 병합</span><span>자동 처리</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>8. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/auth/login</span><span>POST</span><span>이메일 로그인</span></div>
                <div class="func-row"><span>/api/auth/social/{provider}</span><span>POST</span><span>소셜 로그인</span></div>
                <div class="func-row"><span>/api/auth/refresh</span><span>POST</span><span>토큰 갱신</span></div>
                <div class="func-row"><span>/api/auth/logout</span><span>POST</span><span>로그아웃</span></div>
                <div class="func-row"><span>/api/auth/find-id</span><span>POST</span><span>아이디 찾기</span></div>
                <div class="func-row"><span>/api/auth/reset-password</span><span>POST</span><span>비밀번호 재설정</span></div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>보안 기준:</strong> KISA 인터넷 보안 가이드라인, OWASP 인증 보안 권고 반영</p>
                <p><strong>UX 벤치마킹:</strong> ${industryName} 업종 Top 10 서비스 로그인 플로우 분석</p>
            </div>
        </div>
    `;
}

// 결제 기능정의서 생성
function generatePaymentSpec(industry, options) {
    const hasCard = options.includes('신용카드');
    const hasEasyPay = options.includes('간편결제');
    const hasTransfer = options.includes('계좌이체');
    const hasVirtual = options.includes('가상계좌');
    const hasMobile = options.includes('휴대폰 결제');
    const hasPoint = options.includes('포인트 결제');
    const hasComplex = options.includes('복합 결제');
    const hasOverseas = options.includes('해외 결제');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-ORD-003</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">주문확인</span><p>상품/금액 확인<br><small>• 장바구니에서 이동</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">배송정보</span><p>배송지 입력/선택<br><small>• 주소 검색, 요청사항</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">할인적용</span><p>쿠폰/포인트 적용<br><small>• 사용 가능 쿠폰 표시</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">결제수단</span><p>결제 방법 선택<br><small>• 카드, 간편결제 등</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">5</span><span class="step-title">결제진행</span><p>PG사 결제창<br><small>• 결제 승인 처리</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">6</span><span class="step-title">완료</span><p>주문 완료<br><small>• 주문번호 발급</small></p></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 사용자가 선택한 상품/서비스에 대한 결제를 안전하게 처리</p>
                <p><strong>접근 경로:</strong> 장바구니 > 주문하기 / 상품 상세 > 바로구매</p>
                <p><strong>권한:</strong> 회원 (로그인 필수) / 비회원 주문 시 별도 처리</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 화면 구성 (Screen Layout)</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>2.1 주문서 작성 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[영역]</span> 주문 상품 정보 (상품명, 옵션, 수량, 금액)</div>
                        <div class="element"><span class="el-type">[영역]</span> 배송 정보 (배송지 선택/신규 입력)</div>
                        <div class="element"><span class="el-type">[입력]</span> 배송 요청사항 (드롭다운 + 직접입력)</div>
                        <div class="element"><span class="el-type">[영역]</span> 할인 적용 (쿠폰 선택, 포인트 입력)</div>
                        <div class="element"><span class="el-type">[영역]</span> 결제 수단 선택 (라디오버튼)</div>
                        <div class="element"><span class="el-type">[영역]</span> 결제 금액 요약 (상품금액, 배송비, 할인, 최종금액)</div>
                        <div class="element"><span class="el-type">[체크박스]</span> 주문 내용 확인 및 결제 동의</div>
                        <div class="element"><span class="el-type">[버튼]</span> 결제하기 (최종금액 표시)</div>
                    </div>
                </div>
                <div class="screen-item">
                    <h5>2.2 결제 완료 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[아이콘]</span> 결제 완료 체크 아이콘</div>
                        <div class="element"><span class="el-type">[텍스트]</span> 주문번호: 2024XXXXX</div>
                        <div class="element"><span class="el-type">[텍스트]</span> 결제 금액: ₩XXX,XXX</div>
                        <div class="element"><span class="el-type">[텍스트]</span> 예상 배송일: YYYY.MM.DD</div>
                        <div class="element"><span class="el-type">[버튼]</span> 주문 상세 보기</div>
                        <div class="element"><span class="el-type">[버튼]</span> 쇼핑 계속하기</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>3. 결제 수단</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>결제수단</span><span>상세 내용</span><span>수수료</span><span>정산주기</span></div>
                ${hasCard ? `<div class="func-row"><span>신용/체크카드</span><span>• 국내 전 카드사 지원<br>• 할부: 2~12개월 (5만원 이상)<br>• 무이자 이벤트 연동<br>• 카드사별 즉시 할인</span><span>2.5~3.0%</span><span>D+3</span></div>` : ''}
                ${hasEasyPay ? `<div class="func-row"><span>간편결제</span><span>• 네이버페이: 네이버 앱 연동<br>• 카카오페이: 카카오톡 연동<br>• 토스페이: 토스 앱 연동<br>• 페이코: PAYCO 앱 연동</span><span>3.0~3.5%</span><span>D+1~D+3</span></div>` : ''}
                ${hasTransfer ? `<div class="func-row"><span>계좌이체</span><span>• 실시간 계좌이체<br>• 전 은행 지원<br>• 즉시 결제 확인</span><span>1.5~2.0%</span><span>D+1</span></div>` : ''}
                ${hasVirtual ? `<div class="func-row"><span>가상계좌</span><span>• 주문 건별 가상계좌 발급<br>• 입금 기한: 24시간<br>• 미입금 시 자동 취소<br>• 부분입금 불가</span><span>300원/건</span><span>D+1</span></div>` : ''}
                ${hasMobile ? `<div class="func-row"><span>휴대폰 결제</span><span>• SKT, KT, LG U+<br>• 월 결제 한도: 50만원<br>• 소액결제 이용약관 동의</span><span>4.0~5.0%</span><span>익월 15일</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>4. 할인 적용 규칙</h4>
            <div class="func-table">
                <div class="func-row header"><span>할인유형</span><span>적용 규칙</span><span>중복 적용</span><span>우선순위</span></div>
                <div class="func-row"><span>쿠폰</span><span>• 정률: 상품금액의 X% (최대 Y원)<br>• 정액: X원 할인<br>• 최소 주문금액 조건 있음<br>• 1회 주문 시 1장만 사용</span><span>쿠폰끼리 불가</span><span>1</span></div>
                <div class="func-row"><span>적립금</span><span>• 1원 단위 사용 가능<br>• 최소 1,000원 이상 보유 시 사용<br>• 결제금액의 최대 30%</span><span>가능</span><span>2</span></div>
                <div class="func-row"><span>등급 할인</span><span>• VIP: 5%, Gold: 3%, Silver: 1%<br>• 상품금액 기준 자동 적용</span><span>가능</span><span>3</span></div>
                ${hasComplex ? `<div class="func-row"><span>복합 결제</span><span>• 적립금 + 카드 결제<br>• 쿠폰 + 적립금 + 카드<br>• 각 결제 수단별 금액 입력</span><span>가능</span><span>-</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>5. 결제 금액 계산</h4>
            <div class="func-calc">
                <div class="calc-row"><span class="calc-label">상품 금액</span><span class="calc-value">+ ₩XXX,XXX</span></div>
                <div class="calc-row"><span class="calc-label">배송비</span><span class="calc-value">+ ₩3,000 (5만원 이상 무료)</span></div>
                <div class="calc-row discount"><span class="calc-label">쿠폰 할인</span><span class="calc-value">- ₩XX,XXX</span></div>
                <div class="calc-row discount"><span class="calc-label">등급 할인</span><span class="calc-value">- ₩X,XXX</span></div>
                <div class="calc-row discount"><span class="calc-label">적립금 사용</span><span class="calc-value">- ₩X,XXX</span></div>
                <div class="calc-row total"><span class="calc-label">최종 결제 금액</span><span class="calc-value">= ₩XXX,XXX</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>6. PG사 연동</h4>
            <div class="func-table">
                <div class="func-row header"><span>PG사</span><span>연동 방식</span><span>주요 기능</span></div>
                <div class="func-row"><span>토스페이먼츠</span><span>REST API v2<br>브랜드페이, 일반결제</span><span>• 카드, 간편결제, 계좌이체<br>• 자동 빌링 (정기결제)<br>• 결제창 커스터마이징</span></div>
                <div class="func-row"><span>KG이니시스<br>(백업)</span><span>JavaScript SDK<br>INIpay</span><span>• 국내 결제 전 수단<br>• 안정적인 서비스<br>• 이중화 목적</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>7. 결제 프로세스 상세</h4>
            <div class="func-process">
                <div class="process-step">
                    <h5>STEP 1: 결제 요청</h5>
                    <ul>
                        <li>클라이언트에서 주문 정보 검증</li>
                        <li>서버에 주문 생성 요청 (orderId 발급)</li>
                        <li>결제 금액 검증 (상품금액 + 배송비 - 할인)</li>
                    </ul>
                </div>
                <div class="process-step">
                    <h5>STEP 2: PG 결제</h5>
                    <ul>
                        <li>PG사 결제창 호출</li>
                        <li>사용자 결제 정보 입력</li>
                        <li>PG사 결제 승인 요청</li>
                    </ul>
                </div>
                <div class="process-step">
                    <h5>STEP 3: 결제 검증</h5>
                    <ul>
                        <li>PG사 승인 결과 수신 (paymentKey)</li>
                        <li>서버에서 결제 금액 일치 검증</li>
                        <li>결제 확정 API 호출</li>
                    </ul>
                </div>
                <div class="process-step">
                    <h5>STEP 4: 주문 완료</h5>
                    <ul>
                        <li>주문 상태 변경 (결제완료)</li>
                        <li>재고 차감 처리</li>
                        <li>결제 완료 알림 발송 (이메일/SMS/푸시)</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>8. 에러 처리</h4>
            <div class="func-table">
                <div class="func-row header"><span>에러 상황</span><span>에러 메시지</span><span>처리 방법</span></div>
                <div class="func-row"><span>카드 한도 초과</span><span>"카드 한도가 초과되었습니다"</span><span>다른 결제 수단 안내</span></div>
                <div class="func-row"><span>결제 취소</span><span>"결제가 취소되었습니다"</span><span>주문서 페이지 유지, 재시도 가능</span></div>
                <div class="func-row"><span>카드 정보 오류</span><span>"카드 정보를 확인해주세요"</span><span>재입력 유도</span></div>
                <div class="func-row"><span>재고 부족</span><span>"일부 상품의 재고가 부족합니다"</span><span>장바구니로 이동, 수량 조정 안내</span></div>
                <div class="func-row"><span>쿠폰 만료</span><span>"선택한 쿠폰이 만료되었습니다"</span><span>쿠폰 재선택 유도</span></div>
                <div class="func-row"><span>결제 금액 불일치</span><span>"결제 중 오류가 발생했습니다"</span><span>자동 취소 및 재시도 안내</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>9. 보안 요구사항</h4>
            <ul class="func-list">
                <li><strong>결제 정보 암호화:</strong> 카드 정보 클라이언트 암호화 (PG사 SDK)</li>
                <li><strong>결제 금액 검증:</strong> 프론트/백엔드 금액 이중 검증</li>
                <li><strong>HTTPS 통신:</strong> 모든 결제 API SSL 인증서 적용</li>
                <li><strong>결제 이력 기록:</strong> 모든 결제 시도/성공/실패 로그 저장</li>
                <li><strong>이상 거래 탐지:</strong> 동일 IP 다건 결제, 대량 주문 모니터링</li>
            </ul>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>결제 통계:</strong> 간편결제 비중 55%, 카드결제 35%, 기타 10%</p>
                <p><strong>PG사 선정:</strong> ${industryName} 업종 최적 PG사 및 수수료 협의 기준</p>
                <p><strong>전환율 기준:</strong> 결제 완료율 85% 이상 달성 목표</p>
            </div>
        </div>
    `;
}

// 장바구니 기능정의서 생성
function generateCartSpec(industry, options) {
    const hasOptionChange = options.includes('옵션 변경');
    const hasSoldOut = options.includes('품절 상품 알림');
    const hasGift = options.includes('선물하기');
    const hasGuest = options.includes('비회원 장바구니');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-ORD-001</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">상품선택</span><p>상품 상세 확인<br><small>• 옵션, 수량 선택</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">담기</span><p>장바구니 담기<br><small>• 담기 완료 알림</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">확인</span><p>장바구니 확인<br><small>• 담긴 상품 목록</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">수정</span><p>수량/옵션 변경<br><small>• 삭제, 찜 이동</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">5</span><span class="step-title">주문</span><p>주문하기<br><small>• 결제 페이지 이동</small></p></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 구매하려는 상품을 임시 저장하고 관리하여 편리한 구매 경험 제공</p>
                <p><strong>접근 경로:</strong> GNB 장바구니 아이콘 / 상품 상세 > 장바구니 담기 / 마이페이지 > 장바구니</p>
                <p><strong>권한:</strong> 회원/비회원 모두 이용 가능</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 화면 구성 (Screen Layout)</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>2.1 장바구니 메인 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[체크박스]</span> 전체 선택 / 선택 삭제</div>
                        <div class="element"><span class="el-type">[리스트]</span> 장바구니 상품 목록
                            <ul style="margin-left:20px;margin-top:5px;font-size:12px;">
                                <li>상품 이미지 (썸네일)</li>
                                <li>상품명, 브랜드</li>
                                <li>선택 옵션 (색상, 사이즈 등)</li>
                                <li>수량 조절 (+/- 버튼, 직접입력)</li>
                                <li>개별 금액 (할인가/정상가)</li>
                                <li>삭제 버튼, 찜하기 버튼</li>
                            </ul>
                        </div>
                        <div class="element"><span class="el-type">[영역]</span> 배송비 안내 바 (무료배송까지 X원 남음)</div>
                        <div class="element"><span class="el-type">[영역]</span> 결제 예상 금액 (상품금액, 배송비, 할인, 총액)</div>
                        <div class="element"><span class="el-type">[버튼]</span> 선택 상품 주문</div>
                        <div class="element"><span class="el-type">[버튼]</span> 전체 상품 주문</div>
                    </div>
                </div>
                <div class="screen-item">
                    <h5>2.2 장바구니 담기 완료 모달</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[아이콘]</span> 체크 아이콘</div>
                        <div class="element"><span class="el-type">[텍스트]</span> 장바구니에 상품이 담겼습니다</div>
                        <div class="element"><span class="el-type">[정보]</span> 담긴 상품 정보 (썸네일, 상품명, 옵션)</div>
                        <div class="element"><span class="el-type">[버튼]</span> 장바구니 가기</div>
                        <div class="element"><span class="el-type">[버튼]</span> 쇼핑 계속하기</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>3. 기능 상세</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>기능</span><span>상세 내용</span><span>비즈니스 규칙</span><span>필수</span></div>
                <div class="func-row"><span>상품 담기</span><span>• 상품 상세에서 옵션/수량 선택 후 담기<br>• 같은 상품+옵션 재담기 시 수량 합산<br>• 담기 완료 시 모달/토스트 알림</span><span>• 최대 99개까지 담기 가능<br>• 동일 상품 최대 10개</span><span class="required">Y</span></div>
                <div class="func-row"><span>수량 변경</span><span>• +/- 버튼으로 1개씩 조절<br>• 직접 입력으로 수량 변경<br>• 최소 1개 ~ 최대 재고 수량</span><span>• 재고 초과 시 최대 재고로 자동 조정<br>• 수량 변경 시 금액 즉시 재계산</span><span class="required">Y</span></div>
                ${hasOptionChange ? `<div class="func-row"><span>옵션 변경</span><span>• 장바구니에서 옵션 변경 팝업<br>• 색상, 사이즈 등 옵션 선택<br>• 가격 차이 자동 반영</span><span>• 품절 옵션 선택 불가<br>• 옵션 변경 시 재고 확인</span><span class="optional">N</span></div>` : ''}
                <div class="func-row"><span>선택 삭제</span><span>• 개별 삭제: X 버튼 클릭<br>• 다중 삭제: 체크 후 선택 삭제<br>• 삭제 확인 팝업 표시</span><span>• 삭제 시 DB 즉시 반영<br>• 삭제 취소 불가 (재담기 필요)</span><span class="required">Y</span></div>
                <div class="func-row"><span>찜 이동</span><span>• 장바구니 → 위시리스트 이동<br>• 장바구니에서 삭제 후 찜 추가</span><span>• 나중에 구매 유도</span><span class="optional">N</span></div>
                ${hasGift ? `<div class="func-row"><span>선물하기</span><span>• 선물 가능 상품 표시<br>• 받는 분 정보 입력<br>• 선물 메시지 작성</span><span>• 선물 가능 상품만 표시<br>• 배송지 선물 받는 분 주소</span><span class="optional">N</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>4. 회원/비회원 장바구니</h4>
            <div class="func-table">
                <div class="func-row header"><span>구분</span><span>저장 방식</span><span>유효 기간</span><span>병합 처리</span></div>
                <div class="func-row"><span>회원</span><span>서버 DB 저장</span><span>무제한<br>(30일 미접속 시 알림)</span><span>-</span></div>
                ${hasGuest ? `<div class="func-row"><span>비회원</span><span>브라우저 LocalStorage<br>+ 서버 임시 저장</span><span>7일<br>(쿠키 삭제 시 초기화)</span><span>로그인 시 회원 장바구니에 병합</span></div>` : `<div class="func-row"><span>비회원</span><span>브라우저 LocalStorage</span><span>7일</span><span>로그인 시 병합</span></div>`}
            </div>
        </div>

        <div class="func-section">
            <h4>5. 결제 금액 계산</h4>
            <div class="func-calc">
                <div class="calc-row"><span class="calc-label">선택 상품 금액</span><span class="calc-value">+ ₩XXX,XXX (X개)</span></div>
                <div class="calc-row"><span class="calc-label">배송비</span><span class="calc-value">+ ₩3,000</span></div>
                <div class="calc-row highlight"><span class="calc-label">💡 무료배송까지</span><span class="calc-value">₩XX,XXX 남음</span></div>
                <div class="calc-row discount"><span class="calc-label">할인 예상</span><span class="calc-value">- ₩X,XXX (쿠폰 적용 시)</span></div>
                <div class="calc-row total"><span class="calc-label">예상 결제 금액</span><span class="calc-value">= ₩XXX,XXX</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>6. 상품 상태 처리</h4>
            <div class="func-table">
                <div class="func-row header"><span>상태</span><span>표시 방법</span><span>주문 가능 여부</span></div>
                <div class="func-row"><span>정상</span><span>일반 표시</span><span>⭕ 가능</span></div>
                <div class="func-row"><span>품절</span><span>상품명 위 "품절" 뱃지, 회색 처리<br>체크박스 비활성화</span><span>❌ 불가 (삭제 또는 재입고 알림)</span></div>
                <div class="func-row"><span>판매 종료</span><span>"판매 종료" 뱃지, 회색 처리</span><span>❌ 불가 (삭제만 가능)</span></div>
                <div class="func-row"><span>재고 부족</span><span>"N개 남음" 표시<br>수량 조절 시 경고</span><span>⭕ 가능 (재고 수량까지)</span></div>
                <div class="func-row"><span>가격 변동</span><span>"가격이 변경되었습니다" 알림</span><span>⭕ 가능 (변경된 가격 적용)</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>7. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/cart</span><span>GET</span><span>장바구니 목록 조회</span></div>
                <div class="func-row"><span>/api/cart</span><span>POST</span><span>장바구니 상품 담기</span></div>
                <div class="func-row"><span>/api/cart/{id}/quantity</span><span>PATCH</span><span>수량 변경</span></div>
                <div class="func-row"><span>/api/cart/{id}/option</span><span>PATCH</span><span>옵션 변경</span></div>
                <div class="func-row"><span>/api/cart/{id}</span><span>DELETE</span><span>상품 삭제</span></div>
                <div class="func-row"><span>/api/cart/merge</span><span>POST</span><span>비회원→회원 장바구니 병합</span></div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>UX 최적화:</strong> 장바구니 → 결제 전환율 평균 45% 기준 설계</p>
                <p><strong>이탈 방지:</strong> 무료배송 바, 찜 이동 기능으로 이탈률 15% 감소 사례 참조</p>
            </div>
        </div>
    `;
}

// 주문 기능정의서 생성
function generateOrderSpec(industry, options) {
    const hasGift = options.includes('선물 주문');
    const hasOverseas = options.includes('해외 주문');
    const hasBulk = options.includes('대량 주문');
    const hasGuest = options.includes('비회원 주문');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-ORD-002</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 주문 Life Cycle</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">주문서 작성</span><p>배송지/결제 정보<br><small>• 할인 적용</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">결제 완료</span><p>주문번호 발급<br><small>• 결제 승인</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">상품 준비</span><p>판매자 확인<br><small>• 재고 확보, 포장</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">배송중</span><p>택배사 배송<br><small>• 실시간 추적</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">5</span><span class="step-title">배송 완료</span><p>수령 확인<br><small>• 교환/반품 가능</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">6</span><span class="step-title">구매 확정</span><p>거래 종료<br><small>• 리뷰 작성, 적립금</small></p></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 사용자의 주문 생성, 조회, 관리 및 주문 상태 추적 기능 제공</p>
                <p><strong>접근 경로:</strong> 장바구니 > 주문하기 / 상품 상세 > 바로구매 / 마이페이지 > 주문내역</p>
                <p><strong>권한:</strong> 회원 (필수), 비회원 주문 (선택)</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 주문 유형</h4>
            <div class="func-table">
                <div class="func-row header"><span>유형</span><span>설명</span><span>특이사항</span></div>
                <div class="func-row"><span>일반 주문</span><span>장바구니 또는 바로구매를 통한 표준 주문</span><span>기본 주문 플로우</span></div>
                ${hasGuest ? `<div class="func-row"><span>비회원 주문</span><span>회원가입 없이 이메일/휴대폰으로 주문<br>• 주문조회 시 주문번호+인증 필요</span><span>회원가입 유도 팝업</span></div>` : ''}
                ${hasGift ? `<div class="func-row"><span>선물 주문</span><span>배송지를 받는 분 주소로 설정<br>• 선물 메시지 추가 가능<br>• 금액 미표시 옵션</span><span>받는 분 정보 별도 입력</span></div>` : ''}
                ${hasBulk ? `<div class="func-row"><span>대량 주문</span><span>10개 이상 대량 주문<br>• 별도 견적 요청 가능<br>• 담당자 배정</span><span>견적서 발행</span></div>` : ''}
                ${hasOverseas ? `<div class="func-row"><span>해외 주문</span><span>해외 배송 주문<br>• 통관 정보 입력<br>• 국가별 배송비 적용</span><span>개인통관고유번호 필수</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>3. 주문 상태 정의</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>상태 코드</span><span>상태명</span><span>설명</span><span>고객 가능 액션</span><span>자동 전환</span></div>
                <div class="func-row"><span>ORDER_PENDING</span><span>결제 대기</span><span>가상계좌 입금 대기 중</span><span>입금, 주문취소</span><span>24시간 후 자동 취소</span></div>
                <div class="func-row"><span>ORDER_COMPLETE</span><span>주문 완료</span><span>결제 완료, 주문 접수됨</span><span>주문취소, 배송지변경</span><span>-</span></div>
                <div class="func-row"><span>PREPARING</span><span>상품 준비중</span><span>판매자가 상품 준비/포장 중</span><span>취소요청 (승인 필요)</span><span>-</span></div>
                <div class="func-row"><span>SHIPPING</span><span>배송중</span><span>택배사에 인계, 배송 진행 중</span><span>배송조회</span><span>-</span></div>
                <div class="func-row"><span>DELIVERED</span><span>배송 완료</span><span>배송 완료됨</span><span>구매확정, 교환요청, 반품요청</span><span>7일 후 자동 구매확정</span></div>
                <div class="func-row"><span>CONFIRMED</span><span>구매 확정</span><span>거래 완료, 적립금 지급</span><span>리뷰작성</span><span>-</span></div>
                <div class="func-row"><span>CANCELLED</span><span>주문 취소</span><span>주문 취소됨, 환불 진행</span><span>-</span><span>-</span></div>
                <div class="func-row"><span>RETURN_REQUEST</span><span>반품 요청</span><span>반품 요청 접수됨</span><span>반품 취소</span><span>-</span></div>
                <div class="func-row"><span>RETURN_COMPLETE</span><span>반품 완료</span><span>반품 처리 완료, 환불 진행</span><span>-</span><span>-</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>4. 주문 상태 플로우</h4>
            <div class="func-flow-diagram">
                <pre style="background:#1a1a2e;padding:15px;border-radius:8px;color:#eee;font-size:12px;overflow-x:auto;">
┌─────────────┐    결제완료    ┌─────────────┐    준비시작    ┌─────────────┐
│  결제 대기  │ ───────────▶ │  주문 완료  │ ───────────▶ │ 상품 준비중  │
└─────────────┘              └─────────────┘              └─────────────┘
      │                            │                            │
      │ 24시간 초과               │ 취소 요청                   │ 발송 처리
      ▼                            ▼                            ▼
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│  자동 취소  │              │  주문 취소  │              │   배송중    │
└─────────────┘              └─────────────┘              └─────────────┘
                                                               │
                                                               │ 배송 완료
                                                               ▼
                             ┌─────────────┐              ┌─────────────┐
                             │  반품 완료  │ ◀─────────── │  배송 완료  │
                             └─────────────┘   반품 승인   └─────────────┘
                                                               │
                                                               │ 7일 경과/수동
                                                               ▼
                                                         ┌─────────────┐
                                                         │  구매 확정  │
                                                         └─────────────┘
                </pre>
            </div>
        </div>

        <div class="func-section">
            <h4>5. 주문번호 체계</h4>
            <div class="func-table">
                <div class="func-row header"><span>항목</span><span>형식</span><span>예시</span></div>
                <div class="func-row"><span>주문번호</span><span>YYYYMMDD + 일련번호 8자리</span><span>20241230-00000001</span></div>
                <div class="func-row"><span>송장번호</span><span>택배사 코드 + 운송장번호</span><span>CJ-123456789012</span></div>
                <div class="func-row"><span>반품번호</span><span>R + 주문번호</span><span>R20241230-00000001</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>6. 주문 내역 조회</h4>
            <div class="func-table">
                <div class="func-row header"><span>기능</span><span>상세 내용</span></div>
                <div class="func-row"><span>주문 목록</span><span>• 최근 주문순 정렬<br>• 기간별 필터 (1개월/3개월/6개월/1년/전체)<br>• 상태별 필터<br>• 페이지네이션 (20건/페이지)</span></div>
                <div class="func-row"><span>주문 상세</span><span>• 주문 정보 (주문번호, 일시, 상태)<br>• 상품 정보 (상품명, 옵션, 수량, 금액)<br>• 배송 정보 (배송지, 택배사, 송장번호)<br>• 결제 정보 (결제수단, 결제금액)<br>• 할인 정보 (쿠폰, 포인트)</span></div>
                <div class="func-row"><span>배송 추적</span><span>• 택배사 API 연동 실시간 조회<br>• 배송 단계별 일시 표시<br>• 예상 도착일 안내</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>7. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/orders</span><span>POST</span><span>주문 생성</span></div>
                <div class="func-row"><span>/api/orders</span><span>GET</span><span>주문 목록 조회</span></div>
                <div class="func-row"><span>/api/orders/{id}</span><span>GET</span><span>주문 상세 조회</span></div>
                <div class="func-row"><span>/api/orders/{id}/cancel</span><span>POST</span><span>주문 취소</span></div>
                <div class="func-row"><span>/api/orders/{id}/confirm</span><span>POST</span><span>구매 확정</span></div>
                <div class="func-row"><span>/api/orders/{id}/tracking</span><span>GET</span><span>배송 추적</span></div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>상태 설계:</strong> 이커머스 표준 주문 상태 플로우 기반</p>
                <p><strong>자동화:</strong> 자동 구매확정, 자동 취소 등 운영 효율화 고려</p>
            </div>
        </div>
    `;
}

// 배송 기능정의서 생성
function generateDeliverySpec(industry, options) {
    const hasSameDay = options.includes('당일 배송');
    const hasDawn = options.includes('새벽 배송');
    const hasOverseas = options.includes('해외 배송');
    const hasReserve = options.includes('예약 배송');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-DLV-001</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 배송 Life Cycle</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">주문 접수</span><p>주문 확인<br><small>• 결제 완료</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">상품 준비</span><p>포장 진행<br><small>• 재고 확보</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">출고</span><p>택배사 인계<br><small>• 송장번호 발급</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">배송 중</span><p>이동/배달<br><small>• 실시간 추적</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">5</span><span class="step-title">배송 완료</span><p>수령 확인<br><small>• 완료 알림</small></p></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 주문 상품의 배송 정보 관리 및 실시간 배송 상태 추적 제공</p>
                <p><strong>접근 경로:</strong> 마이페이지 > 주문내역 > 배송조회 / 주문 완료 페이지 > 배송조회</p>
                <p><strong>권한:</strong> 회원 (본인 주문), 비회원 (주문번호 + 인증)</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 배송 유형 정의</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>유형</span><span>조건</span><span>배송 소요</span><span>배송비</span><span>가능 지역</span></div>
                <div class="func-row"><span>일반 배송</span><span>상시</span><span>2~3일</span><span>3,000원<br>(5만원 이상 무료)</span><span>전국</span></div>
                ${hasSameDay ? `<div class="func-row"><span>당일 배송</span><span>오전 11시 이전 주문</span><span>당일 저녁</span><span>5,000원</span><span>수도권</span></div>` : ''}
                ${hasDawn ? `<div class="func-row"><span>새벽 배송</span><span>밤 11시 이전 주문</span><span>익일 오전 7시 전</span><span>3,000원</span><span>서울/경기 일부</span></div>` : ''}
                ${hasReserve ? `<div class="func-row"><span>예약 배송</span><span>희망 일시 선택</span><span>지정일</span><span>5,000원</span><span>전국</span></div>` : ''}
                ${hasOverseas ? `<div class="func-row"><span>해외 배송</span><span>해외 주소 입력</span><span>7~14일</span><span>국가별 상이</span><span>해외</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>3. 배송비 정책</h4>
            <div class="func-table">
                <div class="func-row header"><span>조건</span><span>배송비</span><span>비고</span></div>
                <div class="func-row"><span>기본 배송비</span><span>3,000원</span><span>주문 건당</span></div>
                <div class="func-row"><span>무료 배송</span><span>0원</span><span>5만원 이상 구매 시</span></div>
                <div class="func-row"><span>도서산간</span><span>+3,000원</span><span>제주, 울릉도 등</span></div>
                <div class="func-row"><span>분리 배송</span><span>건당 부과</span><span>출고지 다른 경우</span></div>
                <div class="func-row"><span>반품 배송비</span><span>3,000원~6,000원</span><span>고객 귀책 시 왕복 부담</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>4. 배송 상태 추적</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>상태</span><span>설명</span><span>알림 발송</span></div>
                <div class="func-row"><span>집하</span><span>택배사 물류센터에 상품 도착</span><span>-</span></div>
                <div class="func-row"><span>간선 상차</span><span>배송 차량에 상차</span><span>-</span></div>
                <div class="func-row"><span>간선 하차</span><span>목적지 터미널 도착</span><span>-</span></div>
                <div class="func-row"><span>배송 출발</span><span>배송 기사 출발</span><span>✅ SMS/앱푸시</span></div>
                <div class="func-row"><span>배송 완료</span><span>수령인 수령 완료</span><span>✅ SMS/앱푸시</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>5. 택배사 연동</h4>
            <div class="func-table">
                <div class="func-row header"><span>택배사</span><span>코드</span><span>연동 API</span><span>특징</span></div>
                <div class="func-row"><span>CJ대한통운</span><span>CJ</span><span>REST API</span><span>기본 택배사</span></div>
                <div class="func-row"><span>롯데택배</span><span>LOTTE</span><span>REST API</span><span>백업 택배사</span></div>
                <div class="func-row"><span>한진택배</span><span>HANJIN</span><span>REST API</span><span>대량 배송</span></div>
                <div class="func-row"><span>우체국택배</span><span>POST</span><span>REST API</span><span>도서산간 특화</span></div>
                ${hasDawn ? `<div class="func-row"><span>마켓컬리</span><span>KURLY</span><span>전용 API</span><span>새벽배송 전용</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>6. 배송지 관리</h4>
            <div class="func-table">
                <div class="func-row header"><span>기능</span><span>상세 내용</span><span>필수여부</span></div>
                <div class="func-row"><span>배송지 목록</span><span>• 저장된 배송지 최대 10개<br>• 기본 배송지 설정</span><span class="required">필수</span></div>
                <div class="func-row"><span>배송지 추가</span><span>• 주소 검색 (도로명/지번)<br>• 상세 주소 입력<br>• 수령인, 연락처 입력</span><span class="required">필수</span></div>
                <div class="func-row"><span>배송지 변경</span><span>• 출고 전 변경 가능<br>• 변경 시 알림 발송</span><span class="required">필수</span></div>
                <div class="func-row"><span>배송 요청사항</span><span>• 드롭다운 선택 (문앞, 경비실 등)<br>• 직접 입력 가능</span><span class="optional">선택</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>7. 알림 정책</h4>
            <div class="func-table">
                <div class="func-row header"><span>알림 시점</span><span>발송 채널</span><span>내용</span></div>
                <div class="func-row"><span>상품 출고</span><span>SMS, 앱푸시</span><span>[배송시작] 주문하신 상품이 출고되었습니다. 송장번호: XXXX</span></div>
                <div class="func-row"><span>배송 출발</span><span>앱푸시</span><span>[배송중] 배송 기사님이 배송을 시작했습니다.</span></div>
                <div class="func-row"><span>배송 완료</span><span>SMS, 앱푸시</span><span>[배송완료] 상품이 배송 완료되었습니다. 즐거운 쇼핑 되세요!</span></div>
                <div class="func-row"><span>배송 지연</span><span>SMS, 앱푸시</span><span>[배송지연] 기상 악화로 배송이 지연되고 있습니다.</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>8. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/delivery/address</span><span>GET</span><span>배송지 목록 조회</span></div>
                <div class="func-row"><span>/api/delivery/address</span><span>POST</span><span>배송지 추가</span></div>
                <div class="func-row"><span>/api/delivery/tracking/{trackingNo}</span><span>GET</span><span>배송 추적 조회</span></div>
                <div class="func-row"><span>/api/orders/{id}/address</span><span>PATCH</span><span>배송지 변경</span></div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>택배사 선정:</strong> 배송 커버리지, 비용, 서비스 품질 종합 고려</p>
                <p><strong>알림 최적화:</strong> 고객 피로도 고려 최소화된 필수 알림만 발송</p>
            </div>
        </div>
    `;
}

// 리뷰 기능정의서 생성
function generateReviewSpec(industry, options) {
    const hasPhoto = options.includes('포토/동영상 리뷰');
    const hasBest = options.includes('베스트 리뷰');
    const hasReport = options.includes('리뷰 신고');
    const hasReward = options.includes('리뷰 적립금');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-REV-001</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 리뷰 작성 여정</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">구매확정</span><p>상품 수령<br><small>• 구매확정 완료</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">리뷰작성</span><p>별점/내용<br><small>• 최소 20자 이상</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">미디어첨부</span><p>사진/영상<br><small>• 선택 사항</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">등록완료</span><p>검수 후 노출<br><small>• 자동 검수</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">5</span><span class="step-title">적립금</span><p>리워드 지급<br><small>• 유형별 차등</small></p></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 구매 고객의 실제 사용 후기 공유로 신뢰도 향상 및 구매 전환율 증대</p>
                <p><strong>접근 경로:</strong> 마이페이지 > 리뷰 작성 / 주문 내역 > 리뷰 작성 / 상품 상세 > 리뷰 탭</p>
                <p><strong>권한:</strong> 해당 상품 구매확정 회원만 작성 가능</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 화면 구성 (Screen Layout)</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>2.1 리뷰 작성 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[정보]</span> 작성 대상 상품 정보 (이미지, 상품명, 옵션)</div>
                        <div class="element"><span class="el-type">[입력]</span> 별점 (1~5점, 별 아이콘 탭)</div>
                        <div class="element"><span class="el-type">[입력]</span> 리뷰 내용 (최소 20자, 최대 2000자)</div>
                        ${hasPhoto ? `<div class="element"><span class="el-type">[업로드]</span> 사진 첨부 (최대 5장, 각 10MB)</div>
                        <div class="element"><span class="el-type">[업로드]</span> 동영상 첨부 (최대 1개, 60초, 100MB)</div>` : ''}
                        <div class="element"><span class="el-type">[체크박스]</span> 리뷰 공개 동의</div>
                        <div class="element"><span class="el-type">[안내]</span> 적립금 안내 (텍스트 100P, 포토 500P, 영상 1000P)</div>
                        <div class="element"><span class="el-type">[버튼]</span> 리뷰 등록</div>
                    </div>
                </div>
                <div class="screen-item">
                    <h5>2.2 상품 상세 리뷰 목록</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[요약]</span> 평균 별점, 총 리뷰 수</div>
                        <div class="element"><span class="el-type">[차트]</span> 별점 분포 그래프 (5점~1점)</div>
                        <div class="element"><span class="el-type">[필터]</span> 전체/포토/영상/베스트</div>
                        <div class="element"><span class="el-type">[정렬]</span> 최신순/평점높은순/평점낮은순/도움순</div>
                        <div class="element"><span class="el-type">[리스트]</span> 리뷰 카드
                            <ul style="margin-left:20px;margin-top:5px;font-size:12px;">
                                <li>작성자 (닉네임, 일부 마스킹)</li>
                                <li>별점, 작성일</li>
                                <li>구매 옵션</li>
                                <li>리뷰 내용 (더보기)</li>
                                <li>첨부 이미지/영상 (썸네일)</li>
                                <li>도움됐어요 버튼</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>3. 리뷰 유형 및 적립금</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>유형</span><span>작성 조건</span><span>적립금</span><span>지급 시점</span></div>
                <div class="func-row"><span>텍스트 리뷰</span><span>• 별점 필수<br>• 내용 20자 이상</span><span>100P</span><span>검수 완료 즉시</span></div>
                ${hasPhoto ? `<div class="func-row"><span>포토 리뷰</span><span>• 별점 필수<br>• 내용 50자 이상<br>• 사진 1장 이상</span><span>500P</span><span>검수 완료 즉시</span></div>
                <div class="func-row"><span>영상 리뷰</span><span>• 별점 필수<br>• 내용 50자 이상<br>• 10초 이상 영상</span><span>1,000P</span><span>검수 완료 즉시</span></div>` : ''}
                ${hasBest ? `<div class="func-row"><span>베스트 리뷰</span><span>• 주간 도움됐어요 상위 10개<br>• 관리자 선정</span><span>+3,000P</span><span>매주 월요일</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>4. 리뷰 정책</h4>
            <div class="func-table">
                <div class="func-row header"><span>정책</span><span>상세 내용</span><span>설정값</span></div>
                <div class="func-row"><span>작성 기한</span><span>구매확정일로부터 작성 가능 기간</span><span>30일 이내</span></div>
                <div class="func-row"><span>작성 제한</span><span>동일 상품 동일 옵션 1회만 작성</span><span>1회/주문건</span></div>
                <div class="func-row"><span>수정 가능</span><span>작성 후 수정 가능 기간/횟수</span><span>7일 이내 1회</span></div>
                <div class="func-row"><span>삭제</span><span>본인 작성 리뷰 삭제 가능<br>삭제 시 적립금 회수</span><span>언제든 가능</span></div>
                <div class="func-row"><span>최소 글자</span><span>텍스트 리뷰 최소 글자 수</span><span>20자</span></div>
                <div class="func-row"><span>이미지 규격</span><span>업로드 가능 이미지 조건</span><span>JPG/PNG, 최대 10MB, 5장</span></div>
                <div class="func-row"><span>영상 규격</span><span>업로드 가능 영상 조건</span><span>MP4, 최대 100MB, 60초</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>5. 리뷰 검수 기준</h4>
            <div class="func-table">
                <div class="func-row header"><span>검수 항목</span><span>부적절 기준</span><span>처리</span></div>
                <div class="func-row"><span>욕설/비속어</span><span>욕설, 비방, 혐오 표현 포함</span><span>자동 필터링 + 수동 검수</span></div>
                <div class="func-row"><span>광고/홍보</span><span>타 업체 광고, 홍보 URL 포함</span><span>비노출 처리</span></div>
                <div class="func-row"><span>허위 리뷰</span><span>구매하지 않은 상품 리뷰</span><span>삭제 + 경고</span></div>
                <div class="func-row"><span>부적절 이미지</span><span>음란물, 폭력, 저작권 침해</span><span>비노출 + 계정 경고</span></div>
                <div class="func-row"><span>중복 리뷰</span><span>동일 내용 반복 게시</span><span>중복분 삭제</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>6. 리뷰 도움됐어요 기능</h4>
            <div class="func-table">
                <div class="func-row header"><span>기능</span><span>상세 내용</span></div>
                <div class="func-row"><span>도움됐어요 클릭</span><span>• 리뷰당 1인 1회만 가능<br>• 로그인 회원만 가능<br>• 본인 리뷰 불가</span></div>
                <div class="func-row"><span>카운트 표시</span><span>• 리뷰 하단에 "N명에게 도움됨" 표시</span></div>
                <div class="func-row"><span>정렬 활용</span><span>• "도움순" 정렬 시 카운트 기준 정렬</span></div>
                ${hasBest ? `<div class="func-row"><span>베스트 선정</span><span>• 주간 도움 카운트 상위 리뷰 베스트 선정</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>7. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/reviews</span><span>POST</span><span>리뷰 작성</span></div>
                <div class="func-row"><span>/api/products/{id}/reviews</span><span>GET</span><span>상품별 리뷰 목록</span></div>
                <div class="func-row"><span>/api/reviews/{id}</span><span>PATCH</span><span>리뷰 수정</span></div>
                <div class="func-row"><span>/api/reviews/{id}</span><span>DELETE</span><span>리뷰 삭제</span></div>
                <div class="func-row"><span>/api/reviews/{id}/helpful</span><span>POST</span><span>도움됐어요</span></div>
                ${hasReport ? `<div class="func-row"><span>/api/reviews/{id}/report</span><span>POST</span><span>리뷰 신고</span></div>` : ''}
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>전환율 효과:</strong> 포토 리뷰 보유 상품 구매전환율 23% 상승</p>
                <p><strong>적립금 정책:</strong> 적립금 ROI 고려하여 유형별 차등 설계</p>
            </div>
        </div>
    `;
}

// 포인트 기능정의서 생성
function generatePointSpec(industry, options) {
    const hasGradeRate = options.includes('등급별 적립률');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-MKT-001</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 고객 충성도 프로그램으로 재구매 유도 및 고객 리텐션 강화</p>
                <p><strong>접근 경로:</strong> 마이페이지 > 포인트 / 결제 시 포인트 사용 / GNB 포인트 잔액 표시</p>
                <p><strong>권한:</strong> 회원만 적립/사용 가능</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 포인트 적립 정책</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>적립 사유</span><span>적립률/금액</span><span>조건</span><span>적립 시점</span></div>
                <div class="func-row"><span>구매 적립</span><span>결제금액의 1~3%</span><span>구매확정 시<br>(주문취소/반품 시 회수)</span><span>구매확정 즉시</span></div>
                ${hasGradeRate ? `<div class="func-row"><span>등급별 추가 적립</span><span>VIP +2%, Gold +1%</span><span>구매 적립에 추가</span><span>구매확정 즉시</span></div>` : ''}
                <div class="func-row"><span>리뷰 적립</span><span>100~1,000P</span><span>리뷰 유형별 차등</span><span>리뷰 등록 즉시</span></div>
                <div class="func-row"><span>출석 체크</span><span>50~500P</span><span>매일 1회<br>연속 7일 보너스 500P</span><span>출석 체크 즉시</span></div>
                <div class="func-row"><span>생일 포인트</span><span>5,000P</span><span>연 1회, 생일 당일</span><span>생일 00시 자동</span></div>
                <div class="func-row"><span>이벤트 적립</span><span>이벤트별 상이</span><span>이벤트 참여 조건 충족</span><span>이벤트별 상이</span></div>
                <div class="func-row"><span>추천인 적립</span><span>1,000P</span><span>추천 회원 첫 구매 완료 시</span><span>피추천인 구매확정 시</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>3. 포인트 사용 정책</h4>
            <div class="func-table">
                <div class="func-row header"><span>정책</span><span>상세 내용</span><span>설정값</span></div>
                <div class="func-row"><span>최소 보유</span><span>사용 가능 최소 포인트</span><span>1,000P 이상</span></div>
                <div class="func-row"><span>사용 단위</span><span>사용 시 단위</span><span>100P 단위</span></div>
                <div class="func-row"><span>최대 사용</span><span>결제금액 대비 최대 사용 비율</span><span>30% (또는 전액 사용 이벤트)</span></div>
                <div class="func-row"><span>적용 제외</span><span>포인트 사용 불가 상품</span><span>예약 상품, 특가 상품</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>4. 포인트 유효기간</h4>
            <div class="func-table">
                <div class="func-row header"><span>구분</span><span>유효기간</span><span>소멸 정책</span></div>
                <div class="func-row"><span>일반 포인트</span><span>적립일로부터 1년</span><span>FIFO 소멸 (먼저 적립된 것 먼저 소멸)</span></div>
                <div class="func-row"><span>이벤트 포인트</span><span>이벤트별 상이 (30일~90일)</span><span>유효기간 만료 시 소멸</span></div>
                <div class="func-row"><span>소멸 예정 알림</span><span>소멸 30일 전</span><span>앱푸시, 이메일 알림</span></div>
                <div class="func-row"><span>소멸 임박 알림</span><span>소멸 7일 전</span><span>SMS 알림</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>5. 화면 구성</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>마이페이지 > 포인트</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[정보]</span> 현재 보유 포인트 (숫자 강조)</div>
                        <div class="element"><span class="el-type">[정보]</span> 소멸 예정 포인트 (빨간색)</div>
                        <div class="element"><span class="el-type">[탭]</span> 적립 내역 / 사용 내역 / 소멸 내역</div>
                        <div class="element"><span class="el-type">[리스트]</span> 포인트 이력 (일자, 사유, 금액, 잔액)</div>
                        <div class="element"><span class="el-type">[필터]</span> 기간 선택 (1개월/3개월/6개월/1년)</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>6. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/points/balance</span><span>GET</span><span>포인트 잔액 조회</span></div>
                <div class="func-row"><span>/api/points/history</span><span>GET</span><span>포인트 이력 조회</span></div>
                <div class="func-row"><span>/api/points/expiring</span><span>GET</span><span>소멸 예정 포인트 조회</span></div>
                <div class="func-row"><span>/api/points/use</span><span>POST</span><span>포인트 사용</span></div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>적립률 기준:</strong> 업계 평균 적립률 1~3% 반영</p>
                <p><strong>리텐션 효과:</strong> 포인트 보유 회원 재구매율 35% 높음</p>
            </div>
        </div>
    `;
}

// 쿠폰 기능정의서 생성
function generateCouponSpec(industry, options) {
    const hasMultiple = options.includes('중복 사용');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-MKT-002</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 프로모션 및 마케팅 도구로 신규 고객 유입, 재구매 촉진, 객단가 상승 유도</p>
                <p><strong>접근 경로:</strong> 마이페이지 > 쿠폰함 / 결제 시 쿠폰 적용 / 이벤트 페이지 > 쿠폰 다운로드</p>
                <p><strong>권한:</strong> 회원만 보유/사용 가능</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 쿠폰 유형</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>유형</span><span>할인 방식</span><span>조건</span><span>예시</span></div>
                <div class="func-row"><span>정액 할인</span><span>고정 금액 할인</span><span>• 최소 주문금액 조건<br>• 상품금액 기준</span><span>3만원 이상 구매 시 5,000원 할인</span></div>
                <div class="func-row"><span>정률 할인</span><span>결제금액의 X% 할인</span><span>• 최대 할인금액 제한<br>• 최소 주문금액 조건</span><span>10% 할인 (최대 10,000원)</span></div>
                <div class="func-row"><span>무료배송</span><span>배송비 면제</span><span>• 일반배송에만 적용<br>• 도서산간 추가비 별도</span><span>배송비 무료 쿠폰</span></div>
                <div class="func-row"><span>품목 쿠폰</span><span>특정 카테고리/상품 전용</span><span>• 적용 가능 상품 지정<br>• 브랜드별 쿠폰</span><span>아우터 카테고리 15% 할인</span></div>
                <div class="func-row"><span>신규 회원</span><span>첫 구매 전용 할인</span><span>• 가입 후 첫 주문에만<br>• 1회 사용</span><span>첫 구매 20% 할인</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>3. 쿠폰 발급 방식</h4>
            <div class="func-table">
                <div class="func-row header"><span>발급 방식</span><span>상세 내용</span><span>트리거</span></div>
                <div class="func-row"><span>자동 발급</span><span>특정 조건 충족 시 자동 지급<br>• 회원가입 웰컴 쿠폰<br>• 생일 축하 쿠폰<br>• 휴면 복귀 쿠폰<br>• 등급 승급 쿠폰</span><span>시스템 배치</span></div>
                <div class="func-row"><span>다운로드 발급</span><span>이벤트 페이지에서 버튼 클릭 다운로드<br>• 선착순 제한 가능<br>• 1인 1회 제한</span><span>사용자 액션</span></div>
                <div class="func-row"><span>코드 발급</span><span>쿠폰 코드 입력하여 등록<br>• 인플루언서 전용 코드<br>• 파트너십 코드</span><span>사용자 입력</span></div>
                <div class="func-row"><span>관리자 발급</span><span>관리자가 특정 회원에게 직접 발급<br>• CS 보상 쿠폰<br>• VIP 전용 쿠폰</span><span>관리자</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>4. 쿠폰 사용 규칙</h4>
            <div class="func-table">
                <div class="func-row header"><span>규칙</span><span>상세 내용</span><span>설정값</span></div>
                <div class="func-row"><span>사용 개수</span><span>1회 주문 시 사용 가능 쿠폰 수</span><span>1장 (${hasMultiple ? '또는 중복 가능' : '중복 불가'})</span></div>
                <div class="func-row"><span>포인트 병용</span><span>쿠폰과 포인트 동시 사용</span><span>가능</span></div>
                <div class="func-row"><span>할인 적용 순서</span><span>쿠폰 → 포인트 순서로 적용</span><span>쿠폰 먼저</span></div>
                <div class="func-row"><span>최소 결제금액</span><span>쿠폰 적용 후 최소 결제 필요 금액</span><span>100원 이상</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>5. 쿠폰 유효기간</h4>
            <div class="func-table">
                <div class="func-row header"><span>유형</span><span>유효기간</span><span>만료 처리</span></div>
                <div class="func-row"><span>기간 지정형</span><span>발급일 ~ 특정 일자까지</span><span>만료일 자정 소멸</span></div>
                <div class="func-row"><span>기간 계산형</span><span>발급일로부터 N일간</span><span>N일 후 자정 소멸</span></div>
                <div class="func-row"><span>만료 알림</span><span>만료 3일 전 알림</span><span>앱푸시/이메일</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>6. 화면 구성</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>마이페이지 > 쿠폰함</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[탭]</span> 사용 가능 / 사용 완료 / 기간 만료</div>
                        <div class="element"><span class="el-type">[입력]</span> 쿠폰 코드 등록 영역</div>
                        <div class="element"><span class="el-type">[리스트]</span> 쿠폰 카드
                            <ul style="margin-left:20px;margin-top:5px;font-size:12px;">
                                <li>쿠폰명, 할인 금액/률</li>
                                <li>사용 조건 (최소 금액, 적용 상품)</li>
                                <li>유효기간</li>
                                <li>사용하기 버튼</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>7. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/coupons</span><span>GET</span><span>보유 쿠폰 목록</span></div>
                <div class="func-row"><span>/api/coupons/register</span><span>POST</span><span>쿠폰 코드 등록</span></div>
                <div class="func-row"><span>/api/coupons/available</span><span>GET</span><span>주문 시 사용 가능 쿠폰</span></div>
                <div class="func-row"><span>/api/coupons/download/{id}</span><span>POST</span><span>쿠폰 다운로드</span></div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>마케팅 효과:</strong> 쿠폰 사용자 객단가 평균 25% 높음</p>
                <p><strong>발급 전략:</strong> 신규 회원 첫 구매 전환율 40% 상승 목표</p>
            </div>
        </div>
    `;
}

// 예약 기능정의서 생성
function generateBookingSpec(industry, options) {
    const hasWaitlist = options.includes('대기 예약');
    const hasNoShow = options.includes('노쇼 정책');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공', restaurant: '레스토랑', fitness: '피트니스', salon: '뷰티샵' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-BKG-001</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 예약 프로세스</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">서비스 선택</span><p>예약 항목 선택<br><small>• 서비스/상품 선택</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">날짜 선택</span><p>희망 날짜<br><small>• 캘린더 뷰</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">시간 선택</span><p>가능 시간대<br><small>• 슬롯 선택</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">정보 입력</span><p>예약자 정보<br><small>• 요청사항</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">5</span><span class="step-title">결제</span><p>예약금/전액<br><small>• 결제 진행</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">6</span><span class="step-title">확정</span><p>예약 완료<br><small>• 확인 알림</small></p></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 서비스/시설 이용을 위한 사전 예약 및 일정 관리 기능 제공</p>
                <p><strong>접근 경로:</strong> 메인 > 예약하기 / 서비스 상세 > 예약 / 마이페이지 > 예약 내역</p>
                <p><strong>권한:</strong> 회원 (비회원 예약 선택적)</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 화면 구성 (Screen Layout)</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>2.1 예약 메인 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[선택]</span> 서비스/메뉴 선택 (카드형)</div>
                        <div class="element"><span class="el-type">[캘린더]</span> 날짜 선택 (월별 캘린더)
                            <ul style="margin-left:20px;margin-top:5px;font-size:12px;">
                                <li>예약 가능: 파란색</li>
                                <li>마감: 회색</li>
                                <li>휴무: 빗금 표시</li>
                                <li>선택됨: 강조 표시</li>
                            </ul>
                        </div>
                        <div class="element"><span class="el-type">[슬롯]</span> 시간대 선택 (30분/1시간 단위)</div>
                        <div class="element"><span class="el-type">[선택]</span> 인원 선택 (+/- 버튼)</div>
                        <div class="element"><span class="el-type">[입력]</span> 예약자 정보 (이름, 연락처)</div>
                        <div class="element"><span class="el-type">[입력]</span> 요청사항 (선택)</div>
                        <div class="element"><span class="el-type">[요약]</span> 예약 정보 요약 (서비스, 일시, 인원, 금액)</div>
                        <div class="element"><span class="el-type">[버튼]</span> 예약하기</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>3. 예약 기능 상세</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>기능</span><span>상세 내용</span><span>비즈니스 규칙</span><span>필수</span></div>
                <div class="func-row"><span>캘린더 뷰</span><span>• 월별 캘린더 표시<br>• 날짜별 예약 가능 여부 표시<br>• 좌우 스와이프로 월 이동</span><span>• 과거 날짜 선택 불가<br>• 휴무일 선택 불가<br>• 예약 가능 기간 설정</span><span class="required">Y</span></div>
                <div class="func-row"><span>시간대 선택</span><span>• 예약 가능 시간 슬롯 표시<br>• 선택된 시간 강조 표시<br>• 마감 시간 회색 처리</span><span>• 운영 시간 내 슬롯만 표시<br>• 슬롯별 정원 관리<br>• 연속 예약 가능 설정</span><span class="required">Y</span></div>
                <div class="func-row"><span>인원 선택</span><span>• +/- 버튼으로 인원 조절<br>• 최소/최대 인원 제한</span><span>• 인원별 가격 차등 가능<br>• 정원 초과 불가</span><span class="required">Y</span></div>
                ${hasWaitlist ? `<div class="func-row"><span>대기 예약</span><span>• 마감 시 대기 등록<br>• 대기 순번 표시<br>• 취소 발생 시 순번 안내</span><span>• 자동 예약 전환 또는 알림<br>• 대기 취소 가능</span><span class="optional">N</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>4. 예약 상태</h4>
            <div class="func-table">
                <div class="func-row header"><span>상태</span><span>설명</span><span>가능 액션</span></div>
                <div class="func-row"><span>예약 대기</span><span>예약 요청됨, 확정 대기</span><span>취소</span></div>
                <div class="func-row"><span>예약 확정</span><span>예약 승인됨</span><span>변경, 취소</span></div>
                <div class="func-row"><span>예약 변경</span><span>일정/인원 변경됨</span><span>취소</span></div>
                <div class="func-row"><span>이용 완료</span><span>서비스 이용 완료</span><span>리뷰 작성</span></div>
                <div class="func-row"><span>예약 취소</span><span>고객 또는 업체 취소</span><span>재예약</span></div>
                ${hasNoShow ? `<div class="func-row"><span>노쇼</span><span>예약 시간 미방문</span><span>-</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>5. 취소/환불 정책</h4>
            <div class="func-table">
                <div class="func-row header"><span>취소 시점</span><span>환불률</span><span>수수료</span></div>
                <div class="func-row"><span>7일 전까지</span><span>100%</span><span>없음</span></div>
                <div class="func-row"><span>3~6일 전</span><span>50%</span><span>50% 공제</span></div>
                <div class="func-row"><span>1~2일 전</span><span>30%</span><span>70% 공제</span></div>
                <div class="func-row"><span>당일</span><span>0%</span><span>환불 불가</span></div>
                ${hasNoShow ? `<div class="func-row"><span>노쇼</span><span>0%</span><span>향후 예약 제한 (3회 시)</span></div>` : ''}
            </div>
        </div>

        <div class="func-section">
            <h4>6. 알림 정책</h4>
            <div class="func-table">
                <div class="func-row header"><span>알림 시점</span><span>채널</span><span>내용</span></div>
                <div class="func-row"><span>예약 확정</span><span>SMS, 앱푸시, 이메일</span><span>[예약확정] X월 X일 XX:XX 예약이 확정되었습니다.</span></div>
                <div class="func-row"><span>예약 1일 전</span><span>SMS, 앱푸시</span><span>[예약알림] 내일 예약이 있습니다. 시간: XX:XX</span></div>
                <div class="func-row"><span>예약 2시간 전</span><span>앱푸시</span><span>[리마인더] 2시간 후 예약이 있습니다.</span></div>
                <div class="func-row"><span>예약 변경/취소</span><span>SMS, 앱푸시</span><span>예약 변경/취소 안내</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>7. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/bookings/available</span><span>GET</span><span>예약 가능 일시 조회</span></div>
                <div class="func-row"><span>/api/bookings</span><span>POST</span><span>예약 생성</span></div>
                <div class="func-row"><span>/api/bookings</span><span>GET</span><span>예약 목록 조회</span></div>
                <div class="func-row"><span>/api/bookings/{id}</span><span>PATCH</span><span>예약 변경</span></div>
                <div class="func-row"><span>/api/bookings/{id}/cancel</span><span>POST</span><span>예약 취소</span></div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>예약률 기준:</strong> 온라인 예약 전환율 35% 이상 목표</p>
                <p><strong>노쇼 방지:</strong> 리마인더 알림으로 노쇼율 20% 감소 사례 적용</p>
            </div>
        </div>
    `;
}

// 정기구독 기능정의서 생성
function generateSubscriptionSpec(industry, options) {
    const hasPause = options.includes('구독 일시정지');
    const hasProductChange = options.includes('구독 상품 변경');
    const hasDateChange = options.includes('다음 배송일 변경');
    const hasBenefits = options.includes('구독 혜택');
    
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-SUB-001</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 구독 Life Cycle</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">상품 선택</span><p>구독 상품 선택<br><small>• 상품/수량 선택</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">주기 설정</span><p>배송 주기 선택<br><small>• 1~8주 선택</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">결제 등록</span><p>자동결제 등록<br><small>• 카드 정보 등록</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">구독 시작</span><p>첫 배송 진행<br><small>• 즉시 or 예약</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">5</span><span class="step-title">정기 배송</span><p>자동 배송<br><small>• 주기별 결제/배송</small></p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">6</span><span class="step-title">구독 관리</span><p>변경/해지<br><small>• 마이페이지에서 관리</small></p></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 정기적으로 필요한 상품을 자동 결제/배송하여 고객 편의성 및 재구매율 향상</p>
                <p><strong>접근 경로:</strong> 상품 상세 > 정기구독 / 마이페이지 > 구독 관리</p>
                <p><strong>권한:</strong> 회원만 이용 가능 (정기결제 등록 필수)</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 구독 신청</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>항목</span><span>상세 내용</span><span>비고</span></div>
                <div class="func-row"><span>구독 상품</span><span>• 구독 가능 상품에서 선택<br>• 상품별 수량 설정<br>• 여러 상품 동시 구독 가능</span><span>구독 가능 상품 표시</span></div>
                <div class="func-row"><span>배송 주기</span><span>• 1주 / 2주 / 3주 / 4주<br>• 6주 / 8주 선택 가능<br>• 상품별 주기 설정</span><span>가장 많이 선택: 4주</span></div>
                <div class="func-row"><span>첫 배송일</span><span>• 즉시 배송 또는 희망일 선택<br>• 결제일 기준 익영업일 출고</span><span>최대 30일 내 선택</span></div>
                <div class="func-row"><span>정기결제 수단</span><span>• 신용/체크카드 등록<br>• 빌링키 발급 및 저장<br>• 카드 변경 가능</span><span>PG사 빌링 연동</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>3. 구독 관리 기능</h4>
            <div class="func-table">
                <div class="func-row header"><span>기능</span><span>상세 내용</span><span>제한 사항</span></div>
                <div class="func-row"><span>배송 주기 변경</span><span>다음 회차부터 배송 주기 변경</span><span>다음 결제일 3일 전까지</span></div>
                ${hasProductChange ? `<div class="func-row"><span>상품/수량 변경</span><span>구독 상품 추가/삭제, 수량 변경</span><span>다음 결제일 3일 전까지</span></div>` : ''}
                ${hasDateChange ? `<div class="func-row"><span>배송일 변경</span><span>다음 배송일 앞당기기/미루기</span><span>최대 ±14일 범위 내</span></div>` : ''}
                ${hasPause ? `<div class="func-row"><span>구독 일시정지</span><span>구독 일시 중단 (결제 연기)</span><span>최대 60일, 연 2회</span></div>` : ''}
                <div class="func-row"><span>구독 해지</span><span>정기구독 종료</span><span>다음 결제일 1일 전까지</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>4. 자동 결제 프로세스</h4>
            <div class="func-process">
                <div class="process-step">
                    <h5>D-3: 결제 예정 알림</h5>
                    <p>• 결제 예정 금액, 상품 안내<br>• 변경/해지 마감 안내</p>
                </div>
                <div class="process-step">
                    <h5>D-Day: 자동 결제</h5>
                    <p>• 등록된 카드로 자동 결제<br>• 결제 실패 시 익일 재시도 (최대 3회)</p>
                </div>
                <div class="process-step">
                    <h5>D+1: 출고</h5>
                    <p>• 결제 완료 익영업일 출고<br>• 송장번호 발송 알림</p>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>5. 구독 혜택</h4>
            <div class="func-table">
                <div class="func-row header"><span>혜택</span><span>내용</span><span>조건</span></div>
                <div class="func-row"><span>구독 할인</span><span>정기구독 상품 5~15% 할인</span><span>구독 상품 전체</span></div>
                <div class="func-row"><span>무료 배송</span><span>구독 배송비 무료</span><span>금액 무관</span></div>
                <div class="func-row"><span>추가 적립</span><span>회차별 적립금 추가 지급<br>(1회차 100P → 10회차 1,000P)</span><span>회차 누적 시</span></div>
                <div class="func-row"><span>구독자 전용 혜택</span><span>신제품 우선 구매, 한정 쿠폰</span><span>구독 유지 시</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>6. 알림 정책</h4>
            <div class="func-table">
                <div class="func-row header"><span>알림 시점</span><span>채널</span><span>내용</span></div>
                <div class="func-row"><span>결제 3일 전</span><span>앱푸시, 이메일</span><span>결제 예정 안내 (금액, 상품)</span></div>
                <div class="func-row"><span>결제 완료</span><span>SMS, 앱푸시</span><span>결제 완료 및 배송 안내</span></div>
                <div class="func-row"><span>결제 실패</span><span>SMS, 앱푸시</span><span>결제 실패 사유, 재시도 안내</span></div>
                <div class="func-row"><span>배송 출고</span><span>SMS</span><span>송장번호 안내</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>7. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/subscriptions</span><span>POST</span><span>구독 신청</span></div>
                <div class="func-row"><span>/api/subscriptions</span><span>GET</span><span>구독 목록</span></div>
                <div class="func-row"><span>/api/subscriptions/{id}</span><span>PATCH</span><span>구독 변경</span></div>
                <div class="func-row"><span>/api/subscriptions/{id}/pause</span><span>POST</span><span>일시정지</span></div>
                <div class="func-row"><span>/api/subscriptions/{id}/cancel</span><span>POST</span><span>구독 해지</span></div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>구독 유지율:</strong> 평균 6개월 이상 유지율 65% 기준</p>
                <p><strong>LTV 효과:</strong> 구독 고객 LTV 일반 고객 대비 3.2배</p>
            </div>
        </div>
    `;
}

// 마이페이지 기능정의서 생성
function generateMypageSpec(industry, options) {
    const industryNames = { fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', finance: '금융', travel: '여행', public: '공공' };
    const industryName = industryNames[industry] || '일반';
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">FD-MYP-001</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능 목적:</strong> 회원 개인화 서비스의 중심 허브로서 주문, 혜택, 정보 관리 기능 제공</p>
                <p><strong>접근 경로:</strong> GNB > 마이페이지 (로그인 시) / 하단 네비게이션 > MY</p>
                <p><strong>권한:</strong> 로그인 회원만 접근 가능</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 마이페이지 메뉴 구조</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>대분류</span><span>메뉴</span><span>기능</span><span>필수</span></div>
                <div class="func-row"><span rowspan="3">쇼핑 정보</span><span>주문/배송조회</span><span>• 주문 목록 (기간별 필터)<br>• 주문 상세 보기<br>• 배송 추적<br>• 주문 취소/반품 신청</span><span class="required">Y</span></div>
                <div class="func-row"><span>위시리스트</span><span>• 찜한 상품 목록<br>• 장바구니 담기<br>• 품절/가격 변동 알림</span><span class="optional">N</span></div>
                <div class="func-row"><span>최근 본 상품</span><span>• 최근 조회 상품 50개<br>• 장바구니/찜 담기</span><span class="optional">N</span></div>
                <div class="func-row"><span rowspan="3">혜택 관리</span><span>쿠폰함</span><span>• 보유 쿠폰 목록<br>• 쿠폰 다운로드<br>• 쿠폰 코드 등록</span><span class="required">Y</span></div>
                <div class="func-row"><span>적립금</span><span>• 보유 적립금<br>• 적립/사용/소멸 내역<br>• 소멸 예정 적립금</span><span class="required">Y</span></div>
                <div class="func-row"><span>회원 등급</span><span>• 현재 등급/혜택<br>• 등급 기준 안내<br>• 다음 등급까지 금액</span><span class="optional">N</span></div>
                <div class="func-row"><span rowspan="3">회원 정보</span><span>회원정보 수정</span><span>• 기본 정보 수정<br>• 비밀번호 변경<br>• 마케팅 수신 설정</span><span class="required">Y</span></div>
                <div class="func-row"><span>배송지 관리</span><span>• 배송지 추가/수정/삭제<br>• 기본 배송지 설정<br>• 최대 10개</span><span class="required">Y</span></div>
                <div class="func-row"><span>결제수단 관리</span><span>• 등록 카드 관리<br>• 간편결제 연동</span><span class="optional">N</span></div>
                <div class="func-row"><span rowspan="2">활동 관리</span><span>리뷰 관리</span><span>• 작성 가능 리뷰<br>• 내가 쓴 리뷰<br>• 적립금 내역</span><span class="optional">N</span></div>
                <div class="func-row"><span>문의 내역</span><span>• 1:1 문의 목록<br>• 문의 작성<br>• 답변 확인</span><span class="optional">N</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>3. 마이페이지 대시보드</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>상단 프로필 영역</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[이미지]</span> 프로필 사진 (변경 가능)</div>
                        <div class="element"><span class="el-type">[텍스트]</span> 회원명 + 등급 뱃지</div>
                        <div class="element"><span class="el-type">[텍스트]</span> 등급 혜택 요약</div>
                    </div>
                </div>
                <div class="screen-item">
                    <h5>혜택 현황</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[숫자]</span> 보유 쿠폰 N장</div>
                        <div class="element"><span class="el-type">[숫자]</span> 적립금 N원</div>
                        <div class="element"><span class="el-type">[숫자]</span> 위시리스트 N개</div>
                    </div>
                </div>
                <div class="screen-item">
                    <h5>주문 현황</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[숫자]</span> 입금대기 N</div>
                        <div class="element"><span class="el-type">[숫자]</span> 배송준비 N</div>
                        <div class="element"><span class="el-type">[숫자]</span> 배송중 N</div>
                        <div class="element"><span class="el-type">[숫자]</span> 배송완료 N</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="func-section">
            <h4>4. 회원 등급 시스템</h4>
            <div class="func-table">
                <div class="func-row header"><span>등급</span><span>조건</span><span>혜택</span></div>
                <div class="func-row"><span>Welcome</span><span>가입 시 기본</span><span>기본 적립 1%</span></div>
                <div class="func-row"><span>Silver</span><span>누적 10만원 이상</span><span>적립 1.5%, 쿠폰 월 1장</span></div>
                <div class="func-row"><span>Gold</span><span>누적 30만원 이상</span><span>적립 2%, 쿠폰 월 2장, 무료배송 쿠폰</span></div>
                <div class="func-row"><span>VIP</span><span>누적 100만원 이상</span><span>적립 3%, 쿠폰 월 3장, 전 상품 무료배송</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>5. API 명세</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>Method</span><span>용도</span></div>
                <div class="func-row"><span>/api/my/dashboard</span><span>GET</span><span>마이페이지 대시보드</span></div>
                <div class="func-row"><span>/api/my/profile</span><span>GET/PATCH</span><span>회원정보 조회/수정</span></div>
                <div class="func-row"><span>/api/my/orders</span><span>GET</span><span>주문 내역</span></div>
                <div class="func-row"><span>/api/my/wishlist</span><span>GET</span><span>위시리스트</span></div>
                <div class="func-row"><span>/api/my/grade</span><span>GET</span><span>등급 정보</span></div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> 유사 ${industryName} 업종 프로젝트 ${refCount}건 분석</p>
                <p><strong>UX 벤치마킹:</strong> 주요 커머스 마이페이지 구조 분석</p>
                <p><strong>활용도 기준:</strong> 마이페이지 방문률 30% 이상 목표</p>
            </div>
        </div>
    `;
}

// ============================================
// Visual Search
// ============================================

function initVisualSearch() {
    const searchInput = document.getElementById('visualSearchInput');
    const searchBtn = document.getElementById('visualSearchBtn');
    const visualTags = document.querySelectorAll('.visual-tag');
    
    let selectedTags = [];
    
    visualTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
            const tagText = tag.getAttribute('data-tag');
            
            if (tag.classList.contains('active')) {
                selectedTags.push(tagText);
            } else {
                selectedTags = selectedTags.filter(t => t !== tagText);
            }
            
            // Update search input
            if (searchInput) {
                searchInput.value = selectedTags.join(' + ');
            }
        });
    });
    
    searchBtn?.addEventListener('click', () => {
        performVisualSearch(searchInput?.value || selectedTags.join(' '));
    });
}

function performVisualSearch(query) {
    const visualGrid = document.querySelector('.visual-grid');
    if (!visualGrid) return;
    
    // Animate grid items
    const items = visualGrid.querySelectorAll('.visual-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 100);
    });
}

// ============================================
// Tech Stack Form
// ============================================

function initTechStackForm() {
    const form = document.getElementById('techstackForm');
    const resultCard = document.querySelector('.techstack-result-card');
    const platformSelect = document.getElementById('techPlatform');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (resultCard) {
            resultCard.style.animation = 'none';
            resultCard.offsetHeight;
            resultCard.style.animation = 'fadeIn 0.5s ease';
            
            // Update compatibility based on selection
            updateCompatibilityResult();
        }
    });
    
    // Listen for platform changes
    platformSelect?.addEventListener('change', () => {
        updateCompatibilityResult();
    });
}

// ============================================
// 범용 기능정의서 생성 함수
// ============================================
function generateGenericFuncSpec(funcType, funcName, industry, options) {
    const industryNames = { 
        fashion: '패션', beauty: '뷰티', fnb: 'F&B', healthcare: '헬스케어', education: '교육', 
        finance: '금융', travel: '여행', public: '공공기관', realestate: '부동산', restaurant: '레스토랑',
        fitness: '피트니스', salon: '뷰티샵', consulting: '컨설팅', recruitment: '채용',
        media: '미디어', entertainment: '엔터테인먼트', ott: 'OTT', gaming: '게임', community: '커뮤니티',
        nonprofit: '비영리', association: '협회', university: '대학교',
        b2b_commerce: 'B2B커머스', saas: 'SaaS', manufacturing: '제조', logistics: '물류',
        electronics: '가전', furniture: '가구', sports: '스포츠', kids: '유아동', pets: '반려동물', luxury: '럭셔리', lifestyle: '라이프스타일'
    };
    const industryName = industryNames[industry] || '일반';
    const docId = `FD-${funcType.toUpperCase().substring(0, 3)}-001`;
    
    // 기능 유형별 상세 정보
    const funcTypeInfo = {
        // 상품/서비스
        size_guide: { category: '상품', icon: '📏', purpose: '상품별 사이즈 정보를 제공하여 구매 결정을 돕는 기능', steps: ['상품 상세 진입', '사이즈 가이드 클릭', '사이즈표 확인', '내 사이즈 선택', '추천 결과 확인'] },
        styling: { category: '상품', icon: '👗', purpose: 'AI 기반으로 고객에게 맞춤 스타일링을 추천하는 기능', steps: ['스타일 분석 시작', '취향 선택', '체형 정보 입력', 'AI 분석 진행', '추천 코디 확인'] },
        virtual_fitting: { category: '상품', icon: '🪞', purpose: '가상으로 의류를 피팅해볼 수 있는 AR 기능', steps: ['가상피팅 시작', '사진 업로드/촬영', '상품 선택', 'AR 피팅 실행', '결과 저장/공유'] },
        skin_diagnosis: { category: '진단', icon: '🔬', purpose: 'AI를 활용하여 피부 상태를 분석하고 맞춤 제품을 추천하는 기능', steps: ['진단 시작', '피부 촬영', 'AI 분석 진행', '결과 확인', '맞춤 제품 추천'] },
        virtual_makeup: { category: '체험', icon: '💄', purpose: 'AR로 메이크업을 가상 체험해볼 수 있는 기능', steps: ['가상 메이크업 시작', '카메라 활성화', '제품 선택', 'AR 적용', '저장/공유'] },
        ingredient: { category: '정보', icon: '🧪', purpose: '화장품 성분을 분석하고 피부 타입별 적합성을 안내하는 기능', steps: ['성분 분석 시작', '제품 선택/검색', '성분 목록 확인', '주의 성분 체크', '피부타입 매칭'] },
        spec_compare: { category: '상품', icon: '📊', purpose: '여러 제품의 스펙을 비교할 수 있는 기능', steps: ['비교할 상품 선택', '비교 목록 추가', '스펙 비교 화면', '항목별 비교', '최종 선택'] },
        compatibility: { category: '상품', icon: '🔗', purpose: '기기 간 호환성을 확인하는 기능', steps: ['호환성 체크 시작', '기기 선택', '호환 제품 검색', '결과 확인', '구매로 이동'] },
        '3d_viewer': { category: '상품', icon: '🎨', purpose: '상품을 3D로 360도 살펴볼 수 있는 기능', steps: ['3D 뷰어 실행', '상품 로딩', '회전/확대', '세부 확인', '색상 변경'] },
        ar_placement: { category: '체험', icon: '📱', purpose: 'AR로 가구/제품을 실제 공간에 배치해볼 수 있는 기능', steps: ['AR 배치 시작', '카메라 활성화', '공간 인식', '상품 배치', '저장/공유'] },
        
        // 예약/신청
        booking: { category: '예약', icon: '📅', purpose: '서비스/시설을 예약하는 기능', steps: ['예약 시작', '날짜/시간 선택', '옵션 선택', '정보 입력', '예약 완료'] },
        class_booking: { category: '예약', icon: '🏃', purpose: '운동/수업을 예약하는 기능', steps: ['수업 선택', '일정 확인', '시간 선택', '예약 확인', '예약 완료'] },
        pt_booking: { category: '예약', icon: '💪', purpose: 'PT 세션을 예약하는 기능', steps: ['트레이너 선택', '가능 시간 확인', '시간 선택', '예약 정보 확인', '예약 완료'] },
        consultation: { category: '상담', icon: '💬', purpose: '전문가 상담을 신청하는 기능', steps: ['상담 유형 선택', '희망 일시 선택', '상담 내용 입력', '신청 완료', '확인 알림'] },
        telemedicine: { category: '진료', icon: '🩺', purpose: '화상으로 비대면 진료를 받는 기능', steps: ['진료 신청', '증상 입력', '대기실 입장', '화상 진료', '처방전 발급'] },
        visit_booking: { category: '예약', icon: '🏠', purpose: '매물/시설 방문을 예약하는 기능', steps: ['매물 선택', '방문 희망일 선택', '연락처 입력', '예약 확인', '방문 완료'] },
        
        // 건강/운동
        exercise_log: { category: '기록', icon: '📝', purpose: '운동 내역을 기록하고 관리하는 기능', steps: ['운동 기록 시작', '운동 종류 선택', '시간/강도 입력', '완료 기록', '통계 확인'] },
        body_check: { category: '측정', icon: '📏', purpose: '신체 측정 데이터를 기록하고 변화를 추적하는 기능', steps: ['측정 시작', '측정 항목 선택', '데이터 입력', '결과 저장', '변화 그래프 확인'] },
        health_record: { category: '기록', icon: '🏥', purpose: '건강 기록을 관리하는 기능', steps: ['기록 추가', '항목 선택', '데이터 입력', '저장', '히스토리 확인'] },
        medical_record: { category: '의료', icon: '📋', purpose: '진료 기록을 조회하고 관리하는 기능', steps: ['기록 조회', '기간 선택', '진료 내역 확인', '상세 보기', '내보내기'] },
        
        // 콘텐츠/미디어
        online_lecture: { category: '학습', icon: '🎓', purpose: '온라인 강의를 수강하는 기능', steps: ['강의 선택', '강의 시작', '영상 시청', '진도 저장', '완료 처리'] },
        live_class: { category: '학습', icon: '📺', purpose: '실시간 화상 수업에 참여하는 기능', steps: ['수업 입장', '카메라/마이크 설정', '수업 참여', '질문/채팅', '수업 종료'] },
        watch: { category: '콘텐츠', icon: '🎬', purpose: '영상 콘텐츠를 시청하는 기능', steps: ['콘텐츠 선택', '재생 시작', '시청', '평가/리뷰', '관련 추천'] },
        
        // 결제/정산
        payment: { category: '결제', icon: '💳', purpose: '상품/서비스 대금을 결제하는 기능', steps: ['결제 수단 선택', '정보 입력', '결제 진행', '결제 완료', '영수증 발급'] },
        subscription: { category: '구독', icon: '🔄', purpose: '정기 구독을 신청/관리하는 기능', steps: ['구독 상품 선택', '주기 설정', '결제 정보 입력', '구독 시작', '관리 페이지'] },
        settlement: { category: '정산', icon: '💰', purpose: '거래 대금을 정산하는 기능', steps: ['정산 내역 확인', '기간 선택', '상세 내역', '정산 요청', '완료 확인'] },
        
        // 관리자
        admin_dashboard: { category: '관리자', icon: '📊', purpose: '서비스 현황을 모니터링하는 대시보드', steps: ['대시보드 접속', '주요 지표 확인', '상세 분석', '리포트 생성', '알림 확인'] },
        admin_user: { category: '관리자', icon: '👥', purpose: '회원 정보를 관리하는 기능', steps: ['회원 검색', '상세 정보 확인', '정보 수정', '등급/권한 변경', '저장'] },
        admin_order: { category: '관리자', icon: '📦', purpose: '주문을 관리하는 기능', steps: ['주문 목록 확인', '주문 상세', '상태 변경', '배송 처리', '완료 처리'] },
        admin_booking: { category: '관리자', icon: '📅', purpose: '예약을 관리하는 기능', steps: ['예약 목록 확인', '예약 상세', '상태 변경', '알림 발송', '완료 처리'] },
        
        // 기본값
        default: { category: '기능', icon: '⚙️', purpose: '서비스 이용에 필요한 기능', steps: ['기능 시작', '정보 입력', '처리 진행', '결과 확인', '완료'] }
    };
    
    const info = funcTypeInfo[funcType] || funcTypeInfo.default;
    const refCount = Math.floor(Math.random() * 5) + 5;
    
    // 옵션별 상세 스펙 데이터 (UI 컴포넌트, 동작, 메시지 포함)
    const optionSpecs = {
        // 회원/인증
        '소셜 로그인 포함': {
            ui: [
                { type: '버튼', name: '카카오로 시작하기', style: '노란색 배경, 카카오 로고' },
                { type: '버튼', name: '네이버로 시작하기', style: '녹색 배경, 네이버 로고' },
                { type: '버튼', name: '구글로 시작하기', style: '흰색 배경, 구글 로고' },
                { type: '버튼', name: '애플로 시작하기', style: '검정 배경, 애플 로고 (iOS만)' }
            ],
            actions: [
                { trigger: '소셜 버튼 클릭', action: '해당 소셜 OAuth 인증 팝업 오픈' },
                { trigger: '인증 완료', action: '이메일/닉네임/프로필 자동 수집 후 추가정보 입력 화면 이동' },
                { trigger: '인증 취소', action: '팝업 닫힘, 원래 화면 유지' },
                { trigger: '기존 회원 이메일 일치', action: '계정 연동 확인 팝업 표시' }
            ],
            alerts: [
                { condition: '기존 회원 이메일 발견', title: '계정 연동', message: '이미 가입된 이메일입니다. 기존 계정과 연동하시겠습니까?', buttons: ['연동하기 → 비밀번호 확인 후 연동', '새로 가입 → 다른 이메일로 가입'] },
                { condition: '인증 실패', title: '로그인 실패', message: '소셜 로그인에 실패했습니다. 다시 시도해주세요.', buttons: ['확인 → 팝업 닫기'] }
            ]
        },
        '소셜 로그인': {
            ui: [
                { type: '버튼', name: '카카오 로그인', style: '노란색 #FEE500, 44px 높이' },
                { type: '버튼', name: '네이버 로그인', style: '녹색 #03C75A, 44px 높이' },
                { type: '버튼', name: '구글 로그인', style: '흰색 테두리, 44px 높이' }
            ],
            actions: [
                { trigger: '버튼 클릭', action: 'OAuth 인증 페이지 리다이렉트 또는 팝업' },
                { trigger: '인증 성공', action: '토큰 저장, 메인 페이지 이동' },
                { trigger: '인증 실패', action: '에러 메시지 표시, 로그인 페이지 유지' }
            ],
            alerts: [
                { condition: '인증 실패', title: '로그인 실패', message: '소셜 계정 인증에 실패했습니다.', buttons: ['확인 → 팝업 닫기'] }
            ]
        },
        '본인인증 포함': {
            ui: [
                { type: '버튼', name: '휴대폰 본인인증', style: '기본 버튼, 인증 아이콘' },
                { type: '팝업', name: 'NICE/PASS 인증 모듈', style: '500x600px 팝업창' },
                { type: '텍스트', name: '인증 완료 표시', style: '녹색 체크 + "인증완료"' }
            ],
            actions: [
                { trigger: '본인인증 버튼 클릭', action: 'NICE/PASS 인증 팝업 오픈' },
                { trigger: '인증 완료', action: 'CI/DI 값 수신, 이름/생년월일/성별 자동 입력, 팝업 닫기' },
                { trigger: '인증 취소 (X버튼)', action: '팝업 닫기, 인증 미완료 상태 유지' },
                { trigger: '인증 실패', action: '에러 메시지 표시, 재인증 유도' }
            ],
            alerts: [
                { condition: '이미 가입된 CI', title: '중복 가입', message: '이미 가입된 정보입니다. 로그인 또는 아이디 찾기를 이용해주세요.', buttons: ['로그인 → 로그인 페이지 이동', '아이디 찾기 → 아이디 찾기 이동', '취소 → 팝업 닫기'] },
                { condition: '인증 시간 초과', title: '시간 초과', message: '인증 시간이 초과되었습니다. 다시 시도해주세요.', buttons: ['확인 → 팝업 닫고 재시도'] }
            ]
        },
        '본인인증': {
            ui: [
                { type: '라디오', name: '인증 방법 선택', options: ['휴대폰 인증', '아이핀 인증', '공동인증서'] },
                { type: '버튼', name: '인증하기', style: '활성화 버튼, 선택 후 클릭 가능' }
            ],
            actions: [
                { trigger: '인증 방법 선택', action: '해당 인증 버튼 활성화' },
                { trigger: '인증하기 클릭', action: '선택된 인증 모듈 팝업 오픈' },
                { trigger: '인증 완료', action: '실명/생년월일 표시, 다음 단계 버튼 활성화' }
            ],
            alerts: [
                { condition: '인증 실패', title: '인증 실패', message: '본인인증에 실패했습니다. 입력 정보를 확인해주세요.', buttons: ['확인 → 팝업 닫기'] },
                { condition: '만 14세 미만', title: '가입 불가', message: '만 14세 미만은 법정대리인 동의가 필요합니다.', buttons: ['법정대리인 동의 → 동의 프로세스', '취소 → 가입 중단'] }
            ]
        },
        '14세 미만 가입 제한': {
            ui: [
                { type: '체크박스', name: '만 14세 이상입니다', style: '필수 체크, 빨간 별표' },
                { type: '링크', name: '만 14세 미만 가입 안내', style: '밑줄 링크' }
            ],
            actions: [
                { trigger: '체크박스 미체크 시 다음 버튼', action: '다음 버튼 비활성화 상태 유지' },
                { trigger: '안내 링크 클릭', action: '법정대리인 동의 안내 팝업 표시' },
                { trigger: '본인인증 결과 14세 미만', action: '가입 불가 안내 후 프로세스 중단' }
            ],
            alerts: [
                { condition: '14세 미만 확인', title: '가입 제한', message: '만 14세 미만은 법정대리인 동의 후 가입 가능합니다. 법정대리인 동의 절차를 진행하시겠습니까?', buttons: ['동의 진행 → 법정대리인 인증 화면', '취소 → 가입 중단'] }
            ]
        },
        '이메일 인증': {
            ui: [
                { type: '입력', name: '이메일 주소', placeholder: 'example@email.com', validation: '이메일 형식' },
                { type: '버튼', name: '인증메일 발송', style: '입력 필드 우측, 클릭 후 "재발송"으로 변경' },
                { type: '입력', name: '인증번호 6자리', placeholder: '인증번호 입력', style: '인증메일 발송 후 표시' },
                { type: '텍스트', name: '타이머', style: '빨간색, "남은 시간 23:59"' },
                { type: '버튼', name: '인증확인', style: '인증번호 입력 후 활성화' }
            ],
            actions: [
                { trigger: '인증메일 발송 클릭', action: '이메일 발송 API 호출, 인증번호 입력 필드 표시, 24시간 타이머 시작' },
                { trigger: '인증번호 입력 후 인증확인', action: '인증번호 검증, 일치 시 "인증완료" 표시 및 필드 비활성화' },
                { trigger: '재발송 클릭', action: '기존 인증번호 무효화, 새 인증번호 발송, 타이머 리셋' },
                { trigger: '타이머 만료', action: '인증번호 무효화, "시간 초과" 메시지, 재발송 유도' }
            ],
            alerts: [
                { condition: '인증번호 불일치', title: '인증 실패', message: '인증번호가 일치하지 않습니다. 다시 확인해주세요.', buttons: ['확인 → 팝업 닫기, 재입력 가능'] },
                { condition: '시간 초과', title: '시간 초과', message: '인증 유효시간이 만료되었습니다. 인증메일을 재발송해주세요.', buttons: ['재발송 → 새 인증메일 발송', '취소 → 팝업 닫기'] },
                { condition: '재발송 횟수 초과', title: '발송 제한', message: '오늘 인증메일 발송 한도(5회)를 초과했습니다. 내일 다시 시도해주세요.', buttons: ['확인 → 팝업 닫기'] }
            ]
        },
        'SMS 인증': {
            ui: [
                { type: '입력', name: '휴대폰 번호', placeholder: '010-0000-0000', validation: '숫자만, 자동 하이픈' },
                { type: '버튼', name: '인증번호 받기', style: '입력 필드 우측' },
                { type: '입력', name: '인증번호', placeholder: '6자리 숫자', maxLength: 6 },
                { type: '텍스트', name: '타이머', style: '빨간색, "02:59"' },
                { type: '버튼', name: '확인', style: '인증번호 6자리 입력 시 활성화' }
            ],
            actions: [
                { trigger: '인증번호 받기 클릭', action: 'SMS 발송, 인증번호 입력 필드 표시, 3분 타이머 시작' },
                { trigger: '인증번호 입력 후 확인', action: '서버 검증, 성공 시 "인증완료" 표시' },
                { trigger: '재발송 클릭', action: '새 인증번호 SMS 발송, 타이머 리셋 (일 5회 제한)' }
            ],
            alerts: [
                { condition: '인증번호 불일치', title: '인증 실패', message: '인증번호가 일치하지 않습니다.', buttons: ['확인 → 재입력'] },
                { condition: '시간 초과', title: '시간 초과', message: '인증 시간(3분)이 초과되었습니다.', buttons: ['재발송 → 새 인증번호', '취소 → 닫기'] },
                { condition: '발송 한도 초과', title: '발송 제한', message: '일일 인증번호 발송 한도(5회)를 초과했습니다.', buttons: ['확인 → 닫기'] }
            ]
        },
        '마케팅 수신 동의': {
            ui: [
                { type: '체크박스', name: '전체 동의', style: '상단, 클릭 시 하위 전체 체크' },
                { type: '체크박스', name: '이메일 수신 동의', style: '선택 항목' },
                { type: '체크박스', name: 'SMS 수신 동의', style: '선택 항목' },
                { type: '체크박스', name: '앱 푸시 수신 동의', style: '선택 항목' },
                { type: '링크', name: '개인정보 수집 및 이용 동의 보기', style: '내용보기 아이콘' }
            ],
            actions: [
                { trigger: '전체 동의 체크', action: '하위 3개 체크박스 모두 체크' },
                { trigger: '전체 동의 해제', action: '하위 3개 체크박스 모두 해제' },
                { trigger: '개별 체크박스 변경', action: '전체 동의 상태 자동 업데이트' },
                { trigger: '내용보기 클릭', action: '약관 내용 모달 팝업 표시' }
            ],
            alerts: []
        },
        '추천인 코드': {
            ui: [
                { type: '입력', name: '추천인 코드', placeholder: '8자리 영문+숫자 (선택)', maxLength: 8 },
                { type: '버튼', name: '확인', style: '입력 필드 우측, 코드 입력 시 활성화' },
                { type: '텍스트', name: '추천인 정보', style: '확인 후 "홍*동님의 추천" 표시' }
            ],
            actions: [
                { trigger: '코드 입력 후 확인', action: '추천 코드 유효성 검증 API 호출' },
                { trigger: '유효한 코드', action: '추천인 닉네임 마스킹 표시, 혜택 안내 표시' },
                { trigger: '유효하지 않은 코드', action: '에러 메시지 표시, 재입력 유도' }
            ],
            alerts: [
                { condition: '코드 존재하지 않음', title: '확인 실패', message: '존재하지 않는 추천 코드입니다. 다시 확인해주세요.', buttons: ['확인 → 재입력'] },
                { condition: '자기 자신 코드', title: '사용 불가', message: '본인의 추천 코드는 사용할 수 없습니다.', buttons: ['확인 → 닫기'] },
                { condition: '유효한 코드', title: '추천 혜택', message: '추천인과 회원님 모두 1,000포인트가 지급됩니다! (첫 구매 완료 시)', buttons: ['확인 → 닫기'] }
            ]
        },
        '자동 로그인': {
            ui: [
                { type: '체크박스', name: '자동 로그인', style: '로그인 버튼 상단, 체크 아이콘' },
                { type: '텍스트', name: '안내 문구', style: '회색 작은 글씨 "공용 PC에서는 사용을 권장하지 않습니다"' }
            ],
            actions: [
                { trigger: '체크 후 로그인 성공', action: 'Refresh Token 발급, 로컬스토리지 저장, 30일 유지' },
                { trigger: '미체크 후 로그인', action: 'Access Token만 발급, 세션 종료 시 로그아웃' },
                { trigger: '자동 로그인 상태에서 앱 재실행', action: 'Refresh Token 검증, 유효 시 자동 로그인' }
            ],
            alerts: [
                { condition: '토큰 만료', title: '세션 만료', message: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.', buttons: ['로그인 → 로그인 페이지 이동'] },
                { condition: '다른 기기 로그인', title: '보안 알림', message: '다른 기기에서 로그인되었습니다. 본인이 아니라면 비밀번호를 변경해주세요.', buttons: ['확인 → 닫기', '비밀번호 변경 → 변경 페이지'] }
            ]
        },
        '생체인증': {
            ui: [
                { type: '버튼', name: '생체인증으로 로그인', style: '지문/얼굴 아이콘, 기본 버튼' },
                { type: '토글', name: '생체인증 사용', style: '설정 화면 내 ON/OFF 토글' },
                { type: '아이콘', name: '생체인증 아이콘', style: 'Face ID/Touch ID 시스템 아이콘' }
            ],
            actions: [
                { trigger: '생체인증 버튼 클릭', action: '시스템 생체인증 모달 호출 (Face ID/Touch ID/지문)' },
                { trigger: '인증 성공', action: '저장된 자격증명으로 자동 로그인' },
                { trigger: '인증 실패', action: '"인증에 실패했습니다" 메시지, 재시도 또는 비밀번호 입력 유도' },
                { trigger: '생체인증 미지원 기기', action: '생체인증 버튼 숨김, 일반 로그인만 표시' }
            ],
            alerts: [
                { condition: '인증 실패 3회', title: '인증 제한', message: '생체인증이 여러 번 실패했습니다. 비밀번호로 로그인해주세요.', buttons: ['비밀번호 로그인 → 비밀번호 입력 화면'] },
                { condition: '생체정보 변경 감지', title: '보안 알림', message: '기기의 생체정보가 변경되었습니다. 보안을 위해 비밀번호를 다시 입력해주세요.', buttons: ['확인 → 비밀번호 입력 화면'] }
            ]
        },
        '2단계 인증': {
            ui: [
                { type: '입력', name: 'OTP 코드', placeholder: '6자리 인증 코드', maxLength: 6 },
                { type: '텍스트', name: '타이머', style: '빨간색 "남은 시간: 30초"' },
                { type: '버튼', name: '인증 코드 재발송', style: '텍스트 링크 버튼' },
                { type: '체크박스', name: '이 기기 신뢰', style: '30일간 2단계 인증 생략' }
            ],
            actions: [
                { trigger: '로그인 성공 후', action: 'SMS/이메일로 6자리 인증 코드 발송, 입력 화면 표시' },
                { trigger: '코드 입력 후 확인', action: '코드 검증, 성공 시 로그인 완료' },
                { trigger: '신뢰 기기 체크 후 인증', action: '기기 정보 저장, 30일간 해당 기기 2단계 인증 생략' },
                { trigger: '재발송 클릭', action: '새 코드 발송, 기존 코드 무효화, 타이머 리셋' }
            ],
            alerts: [
                { condition: '코드 불일치', title: '인증 실패', message: '인증 코드가 일치하지 않습니다.', buttons: ['확인 → 재입력'] },
                { condition: '5회 실패', title: '계정 보호', message: '인증 시도 횟수를 초과했습니다. 30분 후 다시 시도해주세요.', buttons: ['확인 → 로그인 화면으로 이동'] }
            ]
        },
        '비밀번호 찾기': {
            ui: [
                { type: '탭', name: '이메일/휴대폰', options: ['이메일로 찾기', '휴대폰으로 찾기'] },
                { type: '입력', name: '이메일', placeholder: '가입 시 입력한 이메일' },
                { type: '입력', name: '휴대폰', placeholder: '가입 시 입력한 휴대폰 번호' },
                { type: '버튼', name: '인증번호 받기', style: '기본 버튼' },
                { type: '입력', name: '인증번호', placeholder: '6자리 인증번호' },
                { type: '버튼', name: '확인', style: '활성화 버튼' }
            ],
            actions: [
                { trigger: '이메일 입력 후 인증번호 받기', action: '이메일로 비밀번호 재설정 링크 또는 인증번호 발송' },
                { trigger: '휴대폰 입력 후 인증번호 받기', action: 'SMS로 6자리 인증번호 발송' },
                { trigger: '인증 성공', action: '새 비밀번호 설정 화면 이동' },
                { trigger: '새 비밀번호 설정 완료', action: '"비밀번호가 변경되었습니다" 알림, 로그인 화면 이동' }
            ],
            alerts: [
                { condition: '가입되지 않은 정보', title: '조회 실패', message: '입력하신 정보로 가입된 계정이 없습니다.', buttons: ['확인 → 닫기', '회원가입 → 회원가입 화면'] },
                { condition: '비밀번호 변경 완료', title: '변경 완료', message: '비밀번호가 성공적으로 변경되었습니다. 새 비밀번호로 로그인해주세요.', buttons: ['로그인 → 로그인 화면 이동'] }
            ]
        },
        '아이디 찾기': {
            ui: [
                { type: '탭', name: '휴대폰/이메일', options: ['휴대폰으로 찾기', '이메일로 찾기'] },
                { type: '입력', name: '이름', placeholder: '가입 시 입력한 이름' },
                { type: '입력', name: '휴대폰/이메일', placeholder: '본인 인증용' },
                { type: '버튼', name: '아이디 찾기', style: '기본 버튼' },
                { type: '텍스트', name: '결과 표시', style: '마스킹 처리된 아이디 "abc***@email.com"' }
            ],
            actions: [
                { trigger: '정보 입력 후 찾기 클릭', action: '본인인증 후 가입된 아이디 조회' },
                { trigger: '아이디 찾기 성공', action: '마스킹 처리된 아이디 표시 (가입일 함께 표시)' },
                { trigger: '여러 계정 존재', action: '마스킹된 아이디 목록 표시, 선택 가능' }
            ],
            alerts: [
                { condition: '아이디 찾기 성공', title: '아이디 찾기 완료', message: '회원님의 아이디는 abc***@email.com입니다. (가입일: 2023.01.01)', buttons: ['로그인 → 로그인 화면', '비밀번호 찾기 → 비밀번호 찾기'] },
                { condition: '가입 정보 없음', title: '조회 실패', message: '입력하신 정보로 가입된 계정이 없습니다.', buttons: ['확인 → 닫기', '회원가입 → 회원가입 화면'] }
            ]
        },
        '수량 변경': {
            ui: [
                { type: '버튼', name: '-', style: '원형, 회색 배경, 수량 1일 때 비활성화' },
                { type: '입력', name: '수량', style: '가운데 정렬, 숫자만 입력, 1~99' },
                { type: '버튼', name: '+', style: '원형, 회색 배경, 재고 초과 시 비활성화' }
            ],
            actions: [
                { trigger: '- 버튼 클릭', action: '수량 1 감소 (최소 1), 총 금액 재계산' },
                { trigger: '+ 버튼 클릭', action: '수량 1 증가 (재고 한도 내), 총 금액 재계산' },
                { trigger: '직접 입력', action: '숫자 유효성 검사, 범위 내 값으로 자동 보정' },
                { trigger: '재고 초과 입력', action: '재고 수량으로 자동 변경, 안내 메시지 표시' }
            ],
            alerts: [
                { condition: '재고 부족', title: '재고 부족', message: '현재 재고는 5개입니다. 수량을 조정해주세요.', buttons: ['확인 → 수량 5개로 변경'] },
                { condition: '최대 구매 수량 초과', title: '구매 제한', message: '1인당 최대 구매 수량은 10개입니다.', buttons: ['확인 → 수량 10개로 변경'] }
            ]
        },
        '옵션 변경': {
            ui: [
                { type: '링크', name: '옵션 변경', style: '텍스트 링크, 연필 아이콘' },
                { type: '모달', name: '옵션 선택 팝업', style: '하단 슬라이드업 또는 중앙 모달' },
                { type: '셀렉트', name: '색상', options: '상품 옵션 목록' },
                { type: '셀렉트', name: '사이즈', options: '상품 옵션 목록' },
                { type: '버튼', name: '변경하기', style: '하단 고정 버튼' }
            ],
            actions: [
                { trigger: '옵션 변경 클릭', action: '옵션 선택 모달 팝업' },
                { trigger: '옵션 선택', action: '해당 옵션 재고 확인, 가격 변동 시 금액 표시' },
                { trigger: '변경하기 클릭', action: '장바구니 상품 옵션 업데이트, 모달 닫기' },
                { trigger: '품절 옵션 선택', action: '선택 불가 표시, "품절" 라벨' }
            ],
            alerts: [
                { condition: '가격 변동', title: '가격 변동 안내', message: '선택하신 옵션은 기존 옵션보다 3,000원 비쌉니다.', buttons: ['변경하기 → 옵션 변경 적용', '취소 → 모달 닫기'] },
                { condition: '옵션 변경 완료', title: '변경 완료', message: '상품 옵션이 변경되었습니다.', buttons: ['확인 → 모달 닫기'] }
            ]
        },
        '품절 상품 알림': {
            ui: [
                { type: '버튼', name: '재입고 알림 받기', style: '품절 상품에만 표시, 벨 아이콘' },
                { type: '체크박스', name: '알림 수신 동의', style: '앱 푸시/SMS 선택' },
                { type: '텍스트', name: '알림 설정 완료', style: '"재입고 시 알림을 보내드립니다"' }
            ],
            actions: [
                { trigger: '알림 받기 버튼 클릭', action: '알림 설정 모달/바텀시트 표시' },
                { trigger: '알림 설정 완료', action: '상품-회원 알림 매핑 저장, 버튼 "알림 신청 완료"로 변경' },
                { trigger: '재입고 시', action: '알림 신청 회원에게 푸시/SMS 발송' },
                { trigger: '알림 해제', action: '알림 매핑 삭제, 버튼 원래대로 복구' }
            ],
            alerts: [
                { condition: '알림 설정 완료', title: '알림 설정 완료', message: '상품이 재입고되면 알림을 보내드립니다.', buttons: ['확인 → 닫기'] },
                { condition: '재입고 알림', title: '재입고 알림', message: '찜해두신 [상품명]이 재입고되었습니다! 지금 바로 확인해보세요.', buttons: ['지금 구매 → 상품 상세', '나중에 → 닫기'] }
            ]
        },
        '신용카드': {
            ui: [
                { type: '라디오', name: '카드 선택', options: '등록된 카드 목록 + 새 카드 추가' },
                { type: '입력', name: '카드 번호', placeholder: '0000-0000-0000-0000' },
                { type: '입력', name: '유효기간', placeholder: 'MM/YY' },
                { type: '입력', name: 'CVC', placeholder: '3자리' },
                { type: '셀렉트', name: '할부', options: ['일시불', '2개월', '3개월', '6개월', '12개월'] },
                { type: '버튼', name: '결제하기', style: '하단 고정, 결제 금액 표시' }
            ],
            actions: [
                { trigger: '카드 정보 입력', action: '실시간 유효성 검사, 카드사 자동 인식' },
                { trigger: '결제하기 클릭', action: 'PG사 결제 API 호출, 3DS 인증 팝업' },
                { trigger: '3DS 인증 완료', action: '결제 승인 요청, 성공 시 결제 완료 화면 이동' },
                { trigger: '카드 등록 체크', action: '결제 성공 시 카드 정보 암호화 저장' }
            ],
            alerts: [
                { condition: '카드 인증 실패', title: '결제 실패', message: '카드 인증에 실패했습니다. 카드 정보를 확인해주세요.', buttons: ['확인 → 재입력'] },
                { condition: '한도 초과', title: '결제 실패', message: '카드 한도가 초과되었습니다. 다른 결제 수단을 이용해주세요.', buttons: ['확인 → 결제 수단 선택'] },
                { condition: '결제 성공', title: '결제 완료', message: '결제가 완료되었습니다. 주문번호: 2024010112345', buttons: ['주문 확인 → 주문 상세', '쇼핑 계속 → 메인'] }
            ]
        },
        '간편결제': {
            ui: [
                { type: '버튼', name: '카카오페이', style: '노란색, 카카오페이 로고' },
                { type: '버튼', name: '네이버페이', style: '녹색, 네이버페이 로고' },
                { type: '버튼', name: '토스페이', style: '파란색, 토스 로고' },
                { type: '버튼', name: '페이코', style: '빨간색, 페이코 로고' }
            ],
            actions: [
                { trigger: '간편결제 버튼 클릭', action: '해당 결제 앱으로 이동 또는 결제 팝업' },
                { trigger: '결제 앱에서 인증', action: '비밀번호/생체인증으로 결제 승인' },
                { trigger: '결제 완료 콜백', action: '결제 결과 수신, 성공 시 주문 완료 처리' },
                { trigger: '결제 취소/실패', action: '원래 결제 화면으로 복귀, 에러 메시지 표시' }
            ],
            alerts: [
                { condition: '앱 미설치', title: '앱 필요', message: '카카오페이 앱이 설치되어 있지 않습니다. 설치 후 이용해주세요.', buttons: ['설치하기 → 앱스토어 이동', '취소 → 닫기'] },
                { condition: '결제 성공', title: '결제 완료', message: '카카오페이로 결제가 완료되었습니다.', buttons: ['확인 → 주문 완료 화면'] }
            ]
        },
        '예약 취소': {
            ui: [
                { type: '버튼', name: '예약 취소', style: '회색 또는 빨간색 텍스트 버튼' },
                { type: '라디오', name: '취소 사유', options: ['일정 변경', '단순 변심', '다른 곳 예약', '기타'] },
                { type: '입력', name: '기타 사유', placeholder: '직접 입력 (선택)' },
                { type: '텍스트', name: '취소 수수료 안내', style: '빨간색 강조' },
                { type: '버튼', name: '취소 신청', style: '빨간색 버튼' }
            ],
            actions: [
                { trigger: '예약 취소 클릭', action: '취소 정책 및 수수료 안내 팝업' },
                { trigger: '취소 사유 선택', action: '취소 신청 버튼 활성화' },
                { trigger: '취소 신청 클릭', action: '최종 확인 팝업 후 취소 처리' },
                { trigger: '취소 완료', action: '환불 금액 안내, 예약 목록에서 제거' }
            ],
            alerts: [
                { condition: '취소 확인', title: '예약 취소', message: '예약을 취소하시겠습니까?\n\n취소 수수료: 10,000원\n환불 예정 금액: 40,000원', buttons: ['취소하기 → 취소 처리 및 환불', '아니오 → 팝업 닫기'] },
                { condition: '당일 취소', title: '취소 불가', message: '당일 예약은 취소가 불가능합니다. 직접 연락 부탁드립니다.', buttons: ['전화하기 → 전화 연결', '확인 → 닫기'] },
                { condition: '취소 완료', title: '취소 완료', message: '예약이 취소되었습니다.\n환불 금액 40,000원은 3-5 영업일 내 환불됩니다.', buttons: ['확인 → 예약 목록으로'] }
            ]
        },
        '날짜/시간 선택': {
            ui: [
                { type: '캘린더', name: '날짜 선택', style: '월간 캘린더, 예약 불가일 회색 처리' },
                { type: '그리드', name: '시간 선택', style: '30분 단위 버튼, 마감 시간 비활성화' },
                { type: '텍스트', name: '선택된 일시', style: '상단 고정, "2024년 1월 15일 (월) 오후 2:00"' },
                { type: '버튼', name: '다음', style: '하단 고정, 날짜+시간 선택 시 활성화' }
            ],
            actions: [
                { trigger: '날짜 선택', action: '해당 날짜 시간대 조회, 예약 가능 시간 표시' },
                { trigger: '시간 선택', action: '선택된 일시 상단에 표시, 다음 버튼 활성화' },
                { trigger: '예약 불가 날짜 클릭', action: '토스트 메시지 "예약이 마감되었습니다"' },
                { trigger: '과거 날짜 클릭', action: '선택 불가, 회색 처리 유지' }
            ],
            alerts: [
                { condition: '마감 임박', title: '마감 임박', message: '선택하신 시간대는 1자리만 남았습니다. 바로 예약하시겠습니까?', buttons: ['바로 예약 → 다음 단계', '다른 시간 → 닫기'] }
            ]
        },
        '인원 선택': {
            ui: [
                { type: '스테퍼', name: '성인', style: '- 숫자 + 버튼, 기본값 1' },
                { type: '스테퍼', name: '아동', style: '- 숫자 + 버튼, 기본값 0' },
                { type: '스테퍼', name: '유아', style: '- 숫자 + 버튼, 기본값 0' },
                { type: '텍스트', name: '인원별 요금', style: '성인 50,000원 / 아동 30,000원 / 유아 무료' },
                { type: '텍스트', name: '총 인원/금액', style: '하단 "총 3명 / 130,000원"' }
            ],
            actions: [
                { trigger: '인원 추가', action: '총 인원/금액 실시간 업데이트' },
                { trigger: '인원 감소', action: '최소 1명 유지, 총 인원/금액 업데이트' },
                { trigger: '최대 인원 초과', action: '+ 버튼 비활성화, 안내 메시지' }
            ],
            alerts: [
                { condition: '최대 인원 초과', title: '인원 초과', message: '최대 예약 가능 인원은 10명입니다.', buttons: ['확인 → 닫기'] },
                { condition: '유아 단독 불가', title: '예약 불가', message: '유아는 성인 동반 시에만 예약 가능합니다.', buttons: ['확인 → 닫기'] }
            ]
        },
        '별점 평가': {
            ui: [
                { type: '별점', name: '별점', style: '5개 별 아이콘, 터치/클릭으로 선택' },
                { type: '텍스트', name: '별점 설명', style: '1점-매우별로 ~ 5점-매우만족' },
                { type: '별점', name: '항목별 평가', style: '배송/상품품질/가격 각각 별점' }
            ],
            actions: [
                { trigger: '별 클릭/드래그', action: '해당 점수 선택, 별 채워짐 애니메이션' },
                { trigger: '별점 미선택 시 제출', action: '별점 필수 입력 안내' }
            ],
            alerts: [
                { condition: '별점 미입력', title: '별점을 선택해주세요', message: '리뷰 작성을 위해 별점을 선택해주세요.', buttons: ['확인 → 닫기'] }
            ]
        },
        '포토/동영상 리뷰': {
            ui: [
                { type: '버튼', name: '사진 추가', style: '카메라 아이콘, + 버튼' },
                { type: '버튼', name: '동영상 추가', style: '비디오 아이콘, + 버튼' },
                { type: '썸네일', name: '첨부 이미지', style: '가로 스크롤, X 삭제 버튼' },
                { type: '텍스트', name: '안내', style: '사진 최대 10장, 동영상 1개 (30초 이내)' }
            ],
            actions: [
                { trigger: '사진 추가 클릭', action: '갤러리/카메라 선택 액션시트' },
                { trigger: '이미지 선택', action: '썸네일 추가, 최대 개수 체크' },
                { trigger: '동영상 선택', action: '길이 체크 (30초), 용량 체크 (50MB)' },
                { trigger: 'X 버튼 클릭', action: '해당 이미지/동영상 삭제' }
            ],
            alerts: [
                { condition: '이미지 초과', title: '이미지 초과', message: '이미지는 최대 10장까지 첨부 가능합니다.', buttons: ['확인 → 닫기'] },
                { condition: '동영상 길이 초과', title: '동영상 초과', message: '동영상은 30초 이내만 업로드 가능합니다.', buttons: ['확인 → 닫기'] },
                { condition: '포토 리뷰 적립금', title: '추가 적립금 안내', message: '포토 리뷰 작성 시 500P가 추가 적립됩니다!', buttons: ['확인 → 닫기'] }
            ]
        },
        
        // 상품/검색
        '상품 등록': {
            ui: [
                { type: '탭', name: '등록 단계', options: ['기본 정보', '상세 설명', '옵션/재고', '배송 설정'] },
                { type: '입력', name: '상품명', placeholder: '상품명 입력 (최대 50자)', validation: '필수' },
                { type: '셀렉트', name: '카테고리', options: '대/중/소 카테고리 순차 선택' },
                { type: '입력', name: '판매가', placeholder: '숫자만 입력', format: '천단위 콤마' },
                { type: '업로드', name: '대표 이미지', style: '드래그앤드롭, 최대 10장' },
                { type: '에디터', name: '상세 설명', style: 'WYSIWYG 에디터' },
                { type: '버튼', name: '임시저장', style: '회색 버튼' },
                { type: '버튼', name: '등록', style: '파란색 버튼' }
            ],
            actions: [
                { trigger: '이미지 업로드', action: '이미지 리사이징, 썸네일 생성, 미리보기 표시' },
                { trigger: '임시저장 클릭', action: '현재 입력 내용 DB 저장, "임시저장되었습니다" 토스트' },
                { trigger: '등록 클릭', action: '필수항목 검증, 상품 등록 처리' },
                { trigger: '미리보기 클릭', action: '새 탭에서 상품 상세 미리보기' }
            ],
            alerts: [
                { condition: '필수항목 누락', title: '입력 확인', message: '필수 항목을 모두 입력해주세요.\n- 상품명\n- 카테고리\n- 판매가', buttons: ['확인 → 누락 항목으로 스크롤'] },
                { condition: '등록 완료', title: '등록 완료', message: '상품이 등록되었습니다. 바로 노출하시겠습니까?', buttons: ['바로 노출 → 판매중 변경', '나중에 → 상품 목록으로'] },
                { condition: '페이지 이탈', title: '저장 확인', message: '저장되지 않은 내용이 있습니다. 저장하시겠습니까?', buttons: ['저장 → 임시저장 후 이탈', '저장 안함 → 바로 이탈', '취소 → 현재 페이지 유지'] }
            ]
        },
        '재고 관리': {
            ui: [
                { type: '표', name: '재고 목록', columns: '상품명, 옵션, 현재고, 안전재고, 상태' },
                { type: '필터', name: '재고 상태', options: ['전체', '정상', '부족', '품절'] },
                { type: '입력', name: '재고 수량', style: '인라인 수정 가능' },
                { type: '버튼', name: '일괄 수정', style: '상단 버튼' },
                { type: '버튼', name: '입출고', style: '각 행 버튼' }
            ],
            actions: [
                { trigger: '재고 수량 수정', action: '실시간 DB 업데이트, 변경 이력 저장' },
                { trigger: '입출고 클릭', action: '입출고 모달 표시 (수량, 사유 입력)' },
                { trigger: '안전재고 도달', action: '관리자 알림 발송, 목록 상태 "부족"으로 변경' },
                { trigger: '재고 0 도달', action: '상품 자동 품절 처리, 알림 발송' }
            ],
            alerts: [
                { condition: '안전재고 미만', title: '재고 부족 알림', message: '[상품명] 재고가 안전재고(10개) 미만입니다.\n현재 재고: 5개', buttons: ['발주하기 → 발주 화면', '확인 → 닫기'] },
                { condition: '품절 처리', title: '품절 안내', message: '[상품명] 재고가 소진되어 품절 처리되었습니다.', buttons: ['확인 → 닫기'] }
            ]
        },
        '키워드 검색': {
            ui: [
                { type: '입력', name: '검색창', placeholder: '검색어를 입력하세요', style: '돋보기 아이콘, X 클리어 버튼' },
                { type: '리스트', name: '자동완성', style: '입력 중 드롭다운, 검색어 하이라이트' },
                { type: '태그', name: '최근 검색어', style: '가로 스크롤, X 개별 삭제' },
                { type: '태그', name: '인기 검색어', style: '순위 번호, 상승/하락 표시' }
            ],
            actions: [
                { trigger: '검색어 입력', action: '2자 이상 입력 시 자동완성 API 호출, 300ms 디바운싱' },
                { trigger: '자동완성 항목 클릭', action: '해당 검색어로 검색 실행' },
                { trigger: '엔터/검색 버튼', action: '검색 결과 페이지 이동, 최근 검색어 저장' },
                { trigger: '최근 검색어 클릭', action: '해당 검색어로 검색 실행' },
                { trigger: 'X 클릭 (최근 검색어)', action: '해당 검색어 삭제' },
                { trigger: '전체 삭제 클릭', action: '모든 최근 검색어 삭제' }
            ],
            alerts: [
                { condition: '검색 결과 없음', title: '', message: '"[검색어]"에 대한 검색 결과가 없습니다.', buttons: [] },
                { condition: '최근 검색어 전체 삭제', title: '검색 기록 삭제', message: '최근 검색 기록을 모두 삭제하시겠습니까?', buttons: ['삭제 → 전체 삭제', '취소 → 닫기'] }
            ]
        },
        '필터/정렬': {
            ui: [
                { type: '버튼', name: '필터', style: '필터 아이콘, 적용 개수 뱃지' },
                { type: '셀렉트', name: '정렬', options: ['추천순', '신상품순', '판매량순', '낮은가격순', '높은가격순', '리뷰많은순'] },
                { type: '바텀시트', name: '필터 패널', style: '하단에서 슬라이드업' },
                { type: '체크박스', name: '카테고리 필터', options: '카테고리 목록' },
                { type: '슬라이더', name: '가격 범위', style: '최소~최대, 양쪽 핸들' },
                { type: '버튼', name: '적용', style: '하단 고정, 결과 수 표시' },
                { type: '버튼', name: '초기화', style: '회색 텍스트' }
            ],
            actions: [
                { trigger: '필터 버튼 클릭', action: '필터 바텀시트/모달 오픈' },
                { trigger: '필터 옵션 선택', action: '실시간 결과 수 업데이트 (예: "총 123개 상품")' },
                { trigger: '적용 클릭', action: '바텀시트 닫기, 필터 적용된 결과 표시' },
                { trigger: '초기화 클릭', action: '모든 필터 해제, 기본 상태로 복원' },
                { trigger: '정렬 변경', action: '즉시 목록 재정렬' }
            ],
            alerts: []
        },
        '장바구니 담기': {
            ui: [
                { type: '버튼', name: '장바구니', style: '장바구니 아이콘, 클릭 시 숫자 뱃지 업데이트' },
                { type: '바텀시트', name: '옵션 선택', style: '상품 썸네일, 옵션 선택 UI' },
                { type: '셀렉트', name: '옵션', options: '색상, 사이즈 등 상품 옵션' },
                { type: '스테퍼', name: '수량', style: '- 숫자 + 버튼' },
                { type: '버튼', name: '장바구니 담기', style: '하단 고정, 총 금액 표시' }
            ],
            actions: [
                { trigger: '장바구니 버튼 클릭 (옵션 상품)', action: '옵션 선택 바텀시트 오픈' },
                { trigger: '장바구니 버튼 클릭 (단일 상품)', action: '바로 장바구니 추가, 토스트 메시지' },
                { trigger: '옵션 선택 완료', action: '장바구니 담기 버튼 활성화' },
                { trigger: '장바구니 담기 클릭', action: '장바구니 API 호출, 성공 시 확인 토스트/팝업' }
            ],
            alerts: [
                { condition: '장바구니 추가 성공', title: '장바구니 담기', message: '상품이 장바구니에 담겼습니다.', buttons: ['장바구니 가기 → 장바구니 페이지', '쇼핑 계속 → 팝업 닫기'] },
                { condition: '이미 담긴 상품', title: '장바구니', message: '이미 장바구니에 있는 상품입니다. 수량을 추가하시겠습니까?', buttons: ['수량 추가 → 기존 수량 +1', '취소 → 닫기'] },
                { condition: '품절 상품', title: '품절', message: '죄송합니다. 해당 상품은 품절되었습니다.', buttons: ['재입고 알림 → 알림 신청', '확인 → 닫기'] },
                { condition: '장바구니 한도 초과', title: '장바구니 가득', message: '장바구니는 최대 100개까지 담을 수 있습니다.', buttons: ['장바구니 가기 → 장바구니 정리', '확인 → 닫기'] }
            ]
        },
        '바로구매': {
            ui: [
                { type: '버튼', name: '바로구매', style: '강조 색상, 장바구니 버튼 옆' },
                { type: '바텀시트', name: '옵션 선택', style: '옵션 있는 경우 표시' }
            ],
            actions: [
                { trigger: '바로구매 클릭 (옵션 상품)', action: '옵션 선택 바텀시트 오픈' },
                { trigger: '바로구매 클릭 (단일 상품)', action: '주문서 작성 페이지 직접 이동' },
                { trigger: '옵션 선택 후 구매', action: '해당 옵션으로 주문서 작성 페이지 이동' }
            ],
            alerts: [
                { condition: '비회원 구매 시도', title: '로그인 필요', message: '로그인 후 구매 가능합니다. 로그인하시겠습니까?', buttons: ['로그인 → 로그인 페이지 (이후 복귀)', '비회원 구매 → 비회원 주문서', '취소 → 닫기'] },
                { condition: '품절', title: '구매 불가', message: '해당 상품은 현재 구매할 수 없습니다.', buttons: ['확인 → 닫기'] }
            ]
        },
        '위시리스트 추가': {
            ui: [
                { type: '버튼', name: '찜하기', style: '하트 아이콘, 빈 하트 → 채워진 하트 토글' },
                { type: '카운터', name: '찜 수', style: '하트 아이콘 옆 숫자' }
            ],
            actions: [
                { trigger: '찜하기 클릭 (비활성)', action: '위시리스트 추가, 하트 채워짐, 카운터 +1' },
                { trigger: '찜하기 클릭 (활성)', action: '위시리스트 삭제, 하트 비워짐, 카운터 -1' },
                { trigger: '비로그인 상태 클릭', action: '로그인 유도 팝업' }
            ],
            alerts: [
                { condition: '찜 추가 (비로그인)', title: '로그인 필요', message: '찜하기는 로그인 후 이용 가능합니다.', buttons: ['로그인 → 로그인 페이지', '취소 → 닫기'] },
                { condition: '찜 추가 성공', title: '', message: '위시리스트에 추가되었습니다.', buttons: [] }
            ]
        },
        '쿠폰 적용': {
            ui: [
                { type: '입력', name: '쿠폰 코드', placeholder: '쿠폰 코드 입력', style: '입력 필드 + 적용 버튼' },
                { type: '버튼', name: '쿠폰 적용', style: '입력 필드 우측' },
                { type: '리스트', name: '보유 쿠폰', style: '쿠폰 카드 형태, 라디오 선택' },
                { type: '텍스트', name: '할인 금액', style: '빨간색 "-5,000원"' }
            ],
            actions: [
                { trigger: '쿠폰 코드 입력 후 적용', action: '쿠폰 유효성 검증, 성공 시 할인 적용' },
                { trigger: '보유 쿠폰 선택', action: '해당 쿠폰 적용, 할인 금액 표시' },
                { trigger: '쿠폰 해제', action: '할인 금액 0으로 변경, 총 금액 재계산' }
            ],
            alerts: [
                { condition: '쿠폰 적용 성공', title: '쿠폰 적용', message: '쿠폰이 적용되었습니다. 5,000원 할인!', buttons: ['확인 → 닫기'] },
                { condition: '쿠폰 코드 오류', title: '적용 실패', message: '유효하지 않은 쿠폰 코드입니다.', buttons: ['확인 → 닫기'] },
                { condition: '최소 주문금액 미달', title: '적용 불가', message: '이 쿠폰은 30,000원 이상 구매 시 사용 가능합니다.', buttons: ['확인 → 닫기'] },
                { condition: '사용 기간 만료', title: '적용 불가', message: '사용 기간이 만료된 쿠폰입니다.', buttons: ['확인 → 닫기'] }
            ]
        },
        '포인트 사용': {
            ui: [
                { type: '텍스트', name: '보유 포인트', style: '"보유: 10,000P"' },
                { type: '입력', name: '사용 포인트', placeholder: '사용할 포인트', style: '숫자만 입력' },
                { type: '버튼', name: '전액 사용', style: '텍스트 링크' },
                { type: '텍스트', name: '최소/최대 사용', style: '회색 안내 "최소 1,000P부터 100P 단위"' }
            ],
            actions: [
                { trigger: '포인트 입력', action: '결제 금액에서 차감, 총 결제금액 실시간 업데이트' },
                { trigger: '전액 사용 클릭', action: '보유 포인트 전액 입력 (최대 사용 한도 내)' },
                { trigger: '결제금액 초과 입력', action: '결제금액까지만 자동 조정' }
            ],
            alerts: [
                { condition: '최소 사용금액 미달', title: '포인트 사용 불가', message: '포인트는 1,000P 이상부터 사용 가능합니다.', buttons: ['확인 → 닫기'] },
                { condition: '보유 포인트 초과 입력', title: '입력 오류', message: '보유 포인트를 초과하여 입력할 수 없습니다.', buttons: ['확인 → 보유 포인트로 변경'] }
            ]
        },
        '배송지 선택': {
            ui: [
                { type: '라디오', name: '저장된 배송지', style: '배송지 카드 리스트, 기본배송지 뱃지' },
                { type: '버튼', name: '새 배송지 추가', style: '+ 아이콘, 텍스트 버튼' },
                { type: '입력', name: '수령인', placeholder: '이름' },
                { type: '입력', name: '연락처', placeholder: '010-0000-0000' },
                { type: '버튼', name: '주소 검색', style: '우편번호 검색 팝업 연동' },
                { type: '입력', name: '상세 주소', placeholder: '상세 주소 입력' },
                { type: '체크박스', name: '기본 배송지 설정', style: '선택사항' }
            ],
            actions: [
                { trigger: '저장된 배송지 선택', action: '해당 배송지 정보 자동 입력' },
                { trigger: '새 배송지 추가 클릭', action: '배송지 입력 폼 표시' },
                { trigger: '주소 검색 클릭', action: '다음 주소 검색 API 팝업' },
                { trigger: '주소 선택 완료', action: '우편번호, 주소 자동 입력' },
                { trigger: '저장 클릭', action: '배송지 DB 저장, 목록에 추가' }
            ],
            alerts: [
                { condition: '배송지 삭제', title: '배송지 삭제', message: '해당 배송지를 삭제하시겠습니까?', buttons: ['삭제 → 배송지 삭제', '취소 → 닫기'] },
                { condition: '배송 불가 지역', title: '배송 불가', message: '해당 지역은 배송이 불가능합니다. (도서산간 지역)', buttons: ['확인 → 닫기'] }
            ]
        },
        '주문 취소': {
            ui: [
                { type: '버튼', name: '주문 취소', style: '회색 또는 빨간색 버튼' },
                { type: '라디오', name: '취소 사유', options: ['단순 변심', '다른 상품으로 재주문', '배송 지연', '기타'] },
                { type: '입력', name: '기타 사유', placeholder: '직접 입력' },
                { type: '텍스트', name: '환불 안내', style: '환불 예정 금액, 환불 수단, 소요 기간' }
            ],
            actions: [
                { trigger: '주문 취소 클릭', action: '취소 가능 여부 확인, 취소 사유 선택 화면 표시' },
                { trigger: '취소 사유 선택 후 확인', action: '최종 확인 팝업, 확인 시 취소 처리' },
                { trigger: '취소 완료', action: '주문 상태 "취소완료" 변경, 환불 처리 시작' }
            ],
            alerts: [
                { condition: '취소 확인', title: '주문 취소', message: '주문을 취소하시겠습니까?\n\n환불 예정 금액: 50,000원\n환불 소요 기간: 3~5 영업일', buttons: ['취소하기 → 주문 취소 처리', '아니오 → 팝업 닫기'] },
                { condition: '배송 시작 후', title: '취소 불가', message: '이미 배송이 시작되어 취소가 불가능합니다. 수령 후 반품을 신청해주세요.', buttons: ['반품 신청 → 반품 페이지', '확인 → 닫기'] },
                { condition: '취소 완료', title: '취소 완료', message: '주문이 취소되었습니다.\n환불 금액: 50,000원\n환불 예정일: 3~5 영업일 이내', buttons: ['확인 → 주문 목록으로'] }
            ]
        },
        '반품 신청': {
            ui: [
                { type: '버튼', name: '반품 신청', style: '주문 상세 내 버튼' },
                { type: '체크박스', name: '반품 상품', style: '여러 상품 선택 가능' },
                { type: '라디오', name: '반품 사유', options: ['단순 변심', '상품 불량', '오배송', '상품 상이', '기타'] },
                { type: '업로드', name: '증빙 사진', style: '불량/오배송 시 필수' },
                { type: '라디오', name: '수거 방법', options: ['직접 발송', '수거 요청'] },
                { type: '텍스트', name: '환불 안내', style: '배송비 부담 주체, 환불 예정 금액' }
            ],
            actions: [
                { trigger: '반품 신청 클릭', action: '반품 가능 기간 확인 (수령 후 7일)' },
                { trigger: '반품 사유 선택', action: '배송비 부담 주체 결정 (변심: 고객, 불량: 판매자)' },
                { trigger: '반품 신청 완료', action: '반품 접수, 수거 안내 발송' }
            ],
            alerts: [
                { condition: '반품 기간 초과', title: '반품 불가', message: '반품 가능 기간(수령 후 7일)이 지났습니다.', buttons: ['확인 → 닫기'] },
                { condition: '반품 확인', title: '반품 신청', message: '반품을 신청하시겠습니까?\n\n반품 배송비: 3,000원 (고객 부담)\n환불 예정 금액: 47,000원', buttons: ['신청하기 → 반품 접수', '취소 → 닫기'] },
                { condition: '반품 신청 완료', title: '반품 접수 완료', message: '반품이 접수되었습니다.\n\n수거 예정일: 2024.01.20\n환불 예정일: 상품 확인 후 3~5일', buttons: ['확인 → 주문 상세로'] }
            ]
        },
        '상품 노출 설정': '판매 상태 (판매중/품절/숨김) • 노출 기간 설정 • 카테고리/검색 노출 여부',
        'SEO 설정': '메타 태그 (title/description) 설정 • URL 슬러그 커스텀 • 구조화 데이터 자동 생성',
        '키워드 검색': '검색어 입력 및 결과 표시 • 검색어 하이라이트 • 검색 결과 정렬 옵션',
        '필터 검색': '가격/브랜드/색상 등 다중 필터 • 필터 조합 저장 • 필터 결과 수 실시간 표시',
        '자동완성': '검색어 입력 시 추천어 표시 • 인기 검색어 기반 추천 • 최근 검색어 연동',
        '인기 검색어': '실시간 인기 검색어 집계 • TOP 10 노출 • 시간대별 트렌드 반영',
        '최근 검색어': '사용자별 검색어 저장 • 개별 삭제 및 전체 삭제 • 최대 20개 유지',
        '연관 검색어': '검색어 기반 연관어 추천 • 동의어/유사어 처리 • 카테고리 연관 검색',
        'AI 추천': '사용자 행동 기반 개인화 추천 • 협업 필터링 알고리즘 • 추천 사유 표시',
        
        // 사이즈/스타일
        '사이즈표': '상품별 사이즈 차트 표시 • 신체 치수 가이드 • 브랜드별 사이즈 비교',
        '실측 정보': '실제 측정 치수 제공 • 측정 방법 안내 • 오차 범위 표시',
        '모델 정보': '착용 모델 신체 정보 (키/몸무게/사이즈) • 핏감 설명 • 실착 이미지',
        'AI 사이즈 추천': '신체 정보 입력 기반 사이즈 추천 • 구매/반품 데이터 학습 • 추천 정확도 표시',
        '사이즈 비교': '타 브랜드 사이즈 비교 • 보유 의류 사이즈 기반 추천 • 사이즈 변환표',
        '착용 후기 연동': '사이즈 관련 리뷰 필터 • 체형별 후기 분류 • 사이즈 만족도 통계',
        'AI 스타일 분석': '사용자 취향 분석 설문 • 선호 스타일 도출 • 스타일 프로필 저장',
        '체형별 추천': '체형 정보 입력 • 체형에 맞는 핏/스타일 추천 • 피해야 할 스타일 안내',
        '컬러 매칭': '퍼스널 컬러 진단 • 어울리는 컬러 추천 • 컬러 조합 제안',
        '트렌드 반영': '시즌 트렌드 분석 • 트렌드 아이템 추천 • 스타일 뉴스 연동',
        '코디 세트 추천': '상품과 어울리는 코디 제안 • 세트 할인 연동 • 코디 저장/공유',
        '스타일리스트 Pick': '전문 스타일리스트 큐레이션 • 에디터 추천 코멘트 • 시즌별 컬렉션',
        
        // AR/3D
        'AR 가상 피팅': 'AR 카메라 실행 및 신체 인식 • 의류 3D 모델 피팅 • 다각도 확인 지원',
        '사진 업로드': '전신 사진 업로드 가이드 • 이미지 보정 및 배경 제거 • 체형 인식 처리',
        '체형 인식': 'AI 체형 분석 • 신체 치수 추출 • 맞춤 사이즈 계산',
        '다각도 미리보기': '정면/측면/후면 뷰 제공 • 회전 및 확대 기능 • 움직임 시뮬레이션',
        '저장/공유': '피팅 결과 이미지 저장 • SNS 공유 기능 • 피팅 히스토리 관리',
        '구매 연동': '피팅 화면에서 바로 구매 • 장바구니 담기 • 옵션 선택 연동',
        'AI 피부 분석': '피부 촬영 가이드 제공 • AI 이미지 분석 • 피부 타입/문제점 도출',
        '사진 촬영 가이드': '최적 촬영 환경 안내 (조명/각도) • 촬영 프레임 가이드 • 재촬영 안내',
        '피부 타입 진단': '건성/지성/복합성/민감성 분류 • 피부 점수 산출 • 부위별 상태 분석',
        '트러블 분석': '여드름/모공/주름/색소침착 분석 • 심각도 레벨 표시 • 개선 추이 비교',
        '맞춤 제품 추천': '피부 상태 기반 제품 추천 • 성분 매칭 • 추천 루틴 제공',
        '진단 히스토리': '과거 진단 결과 조회 • 피부 상태 변화 그래프 • 기간별 비교 분석',
        'AR 메이크업': 'AR 카메라 실시간 메이크업 적용 • 제품별 발색 확인 • 룩 저장 기능',
        '실시간 적용': '카메라 영상에 실시간 필터 적용 • 부위별 선택 적용 • 강도 조절',
        '제품별 발색': '실제 제품 컬러 데이터 반영 • 피부톤별 발색 차이 표현 • 다양한 조명 효과',
        '룩 저장': '메이크업 조합 저장 • 룩 이름 설정 • 불러오기 및 수정',
        'SNS 공유': '결과 이미지 SNS 공유 • 해시태그 자동 생성 • 공유 통계',
        '바로 구매': '적용 제품 목록 표시 • 원클릭 장바구니 담기 • 세트 할인 안내',
        '360도 회전': '마우스/터치 드래그 회전 • 자동 회전 모드 • 회전 속도 조절',
        '확대/축소': '핀치 줌 및 버튼 제어 • 상세 부분 확대 • 원래 크기 복귀',
        '색상 변경': '제품 컬러 옵션 선택 • 실시간 3D 모델 변경 • 컬러 비교 모드',
        '소재 확인': '소재별 질감 표현 • 확대 시 디테일 표시 • 소재 정보 툴팁',
        '치수 표시': '3D 모델에 실측 치수 표시 • 부위별 사이즈 정보 • 비교 대상 설정',
        '스크린샷': '현재 화면 캡처 • 저장 및 공유 • 워터마크 옵션',
        'AR 배치 시뮬레이션': 'AR 카메라로 실제 공간 인식 • 가구 3D 모델 배치 • 실척 비율 적용',
        '공간 인식': '바닥/벽면 자동 인식 • 공간 크기 측정 • 장애물 감지',
        '사이즈 조절': '배치 가구 크기 조절 • 실제 사이즈 모드 • 공간 적합성 확인',
        '다각도 확인': '배치 후 360도 확인 • 워크스루 시뮬레이션 • 다른 가구와 조합',
        
        // 장바구니/주문
        '수량 변경': '수량 증감 버튼 및 직접 입력 • 최소/최대 수량 제한 • 재고 연동 확인',
        '옵션 변경': '장바구니 내 옵션 수정 • 변경 가능 옵션 표시 • 가격 자동 재계산',
        '품절 상품 알림': '품절 상품 표시 및 알림 설정 • 재입고 시 푸시/SMS 발송 • 대체 상품 추천',
        '장바구니 유효기간': '담긴 상품 30일 유지 • 만료 예정 알림 • 만료 상품 자동 삭제',
        '비회원 장바구니': '쿠키/로컬스토리지 기반 저장 • 회원 전환 시 자동 병합 • 기기별 동기화',
        '선물하기': '선물 포장 옵션 • 수령인 정보 입력 • 선물 메시지 작성',
        '일반 주문': '표준 주문 프로세스 • 배송지/결제 선택 • 주문 확인 및 완료',
        '바로 구매': '장바구니 거치지 않고 즉시 구매 • 최근 배송지 자동 적용 • 원클릭 결제',
        '선물 주문': '수령인 배송지 입력 • 선물 포장 및 메시지 • 주문자 정보 비노출 옵션',
        '해외 주문': '해외 배송 가능 상품 필터 • 관부가세 안내 • 해외 결제 수단',
        '대량 주문': '대량 주문 문의 양식 • 별도 견적 산출 • 담당자 연결',
        '비회원 주문': '비회원 주문 정보 입력 • 주문 조회용 비밀번호 • 회원가입 유도',
        
        // 결제
        '신용카드': '카드사 선택 및 카드번호 입력 • 할부 개월 선택 • 카드사 포인트 사용',
        '간편결제': '카카오페이/네이버페이/토스 등 연동 • 원클릭 결제 • 자동 결제 등록',
        '계좌이체': '은행 선택 및 계좌 인증 • 실시간 이체 • 이체 확인',
        '가상계좌': '입금 전용 계좌 발급 • 입금 기한 안내 • 입금 확인 알림',
        '휴대폰 결제': '통신사 선택 및 본인 인증 • 소액결제 한도 확인 • 결제 완료 SMS',
        '포인트 결제': '보유 포인트 조회 • 사용 포인트 입력 • 잔여 금액 다른 수단 결제',
        '복합 결제': '2개 이상 결제 수단 조합 • 결제 금액 배분 • 부분 취소 처리',
        '해외 결제': 'PayPal/Stripe 등 해외 PG 연동 • 다중 통화 지원 • 환율 실시간 적용',
        
        // 배송
        '배송조회': '운송장 번호 입력/자동 연동 • 배송 단계별 상태 표시 • 예상 도착일 안내',
        '배송지 변경': '출고 전 배송지 수정 • 주소 검색 및 입력 • 변경 이력 관리',
        '출고 전 취소': '결제 완료~출고 전 취소 가능 • 즉시 환불 처리 • 취소 사유 수집',
        '예약 배송': '희망 배송일 선택 • 시간대 지정 (오전/오후/저녁) • 예약 변경/취소',
        '새벽 배송': '새벽 배송 가능 지역 확인 • 주문 마감 시간 안내 • 부재 시 처리 옵션',
        '당일 배송': '당일 배송 가능 상품/지역 표시 • 주문 마감 시간 • 추가 비용 안내',
        '해외 배송': '해외 배송 가능 국가 • 배송비/기간 계산 • 통관 정보 안내',
        '신선배송': '냉장/냉동 배송 선택 • 온도 유지 포장 • 수령 확인 필수 안내',
        '온도 관리': '콜드체인 배송 추적 • 온도 이력 확인 • 이상 온도 알림',
        '도착 시간 지정': '2시간 단위 시간대 선택 • 지정 시간 변경 • 부재 시 처리',
        '부재시 조치': '경비실/문앞 배송 선택 • 연락 가능 시간대 • 재배송 정책',
        '신선도 보장': '신선도 보장 기준 안내 • 불만족 시 환불 정책 • 품질 피드백 수집',
        '냉장/냉동 선택': '상품별 보관 방법 선택 • 혼합 배송 처리 • 배송비 차등 적용',
        
        // 반품/교환
        '반품 신청': '반품 사유 선택 • 반품 상품 확인 • 수거 방법 선택 (택배/방문)',
        '교환 신청': '교환 사유 및 희망 상품 선택 • 차액 정산 • 교환 배송 안내',
        '환불 처리': '환불 금액 계산 (배송비 등) • 환불 수단 선택 • 환불 예정일 안내',
        '반품 배송비': '귀책 사유별 배송비 부담 • 착불/선불 선택 • 배송비 차감 안내',
        '불량품 처리': '불량 유형 선택 및 사진 첨부 • 우선 처리 프로세스 • 보상 정책 안내',
        '부분 반품': '부분 반품 상품 선택 • 잔여 주문 처리 • 부분 환불 금액 계산',
        
        // 구독
        '정기배송 주기': '배송 주기 선택 (1주/2주/1개월 등) • 주기 변경 • 다음 배송일 확인',
        '구독 일시정지': '일시정지 기간 설정 • 재개 예정일 알림 • 일시정지 횟수 제한',
        '구독 해지': '해지 사유 수집 • 해지 시점 선택 (즉시/결제일) • 재가입 혜택 안내',
        '구독 상품 변경': '구독 중 상품 변경 • 가격 차액 정산 • 변경 적용 시점',
        '다음 배송일 변경': '다음 배송일 조회 및 변경 • 변경 가능 기간 제한 • 변경 알림',
        '구독 혜택': '구독자 전용 할인 • 적립금 추가 지급 • 한정판 우선 구매',
        
        // 리뷰/평가
        '별점 평가': '1~5점 별점 선택 • 항목별 평가 (배송/품질/가격) • 평균 별점 표시',
        '텍스트 리뷰': '리뷰 내용 입력 (최소/최대 글자) • 금칙어 필터링 • 리뷰 수정/삭제',
        '포토/동영상 리뷰': '이미지/영상 업로드 • 용량/개수 제한 • 썸네일 자동 생성',
        '리뷰 수정/삭제': '작성 후 7일 내 수정 가능 • 삭제 시 적립금 회수 • 수정 이력 관리',
        '리뷰 신고': '부적절 리뷰 신고 • 신고 사유 선택 • 관리자 검토 후 처리',
        '베스트 리뷰': '좋아요/도움됨 수 기준 선정 • 베스트 리뷰 상단 노출 • 추가 적립금 지급',
        '리뷰 적립금': '텍스트 리뷰 100P / 포토 500P • 적립금 지급 조건 • 부정 리뷰 적립금 회수',
        
        // 문의/게시판
        '1:1 문의': '문의 유형 선택 • 내용 입력 및 파일 첨부 • 답변 알림 설정',
        '상품 Q&A': '상품 상세에서 문의 작성 • 판매자 답변 • 공개/비밀 설정',
        '답변 알림': '답변 등록 시 푸시/SMS/이메일 알림 • 알림 채널 선택 • 알림 히스토리',
        '비밀글 설정': '비밀글 체크 시 본인/관리자만 조회 • 비밀글 아이콘 표시',
        '파일 첨부': '이미지/문서 첨부 • 파일 용량/개수 제한 • 첨부파일 미리보기',
        '문의 유형 분류': '배송/결제/상품/기타 카테고리 • 유형별 담당자 배정 • 자동 분류 AI',
        '글 작성/수정/삭제': 'WYSIWYG 에디터 • 이미지 삽입 • 임시저장 및 미리보기',
        '댓글': '댓글 작성/수정/삭제 • 대댓글 지원 • 댓글 알림',
        '좋아요': '좋아요 버튼 토글 • 좋아요 수 표시 • 좋아요 누른 사용자 목록',
        '공지 설정': '공지사항 상단 고정 • 공지 기간 설정 • 필독 공지 표시',
        '카테고리 분류': '게시글 카테고리 선택 • 카테고리별 필터 • 카테고리 관리',
        
        // 채팅/알림
        '실시간 채팅': 'WebSocket 기반 실시간 통신 • 메시지 전송/수신 • 온라인 상태 표시',
        '채팅 상담': '상담원 연결 요청 • 상담 대기열 • 상담 종료 후 평가',
        '챗봇': 'AI 챗봇 자동 응답 • FAQ 기반 답변 • 상담원 연결 트리거',
        '파일 전송': '채팅 중 파일 첨부 • 파일 종류/용량 제한 • 다운로드 링크 생성',
        '이미지 전송': '이미지 촬영/선택 전송 • 이미지 압축 처리 • 썸네일 미리보기',
        '읽음 확인': '메시지 읽음 표시 • 읽은 시간 표시 • 미읽음 메시지 카운트',
        '채팅 기록': '채팅 히스토리 저장 • 기간별 조회 • 채팅 내보내기',
        '앱 푸시': 'FCM/APNs 푸시 발송 • 푸시 제목/내용 설정 • 딥링크 연동',
        '이메일 알림': '이메일 템플릿 발송 • 발송 이력 관리 • 수신 거부 처리',
        'SMS 알림': 'SMS/LMS 발송 • 문자 길이별 자동 전환 • 발송 결과 확인',
        '카카오 알림톡': '알림톡 템플릿 등록 • 변수 치환 발송 • 발송 성공/실패 처리',
        '알림 설정': '알림 채널별 ON/OFF • 알림 유형별 설정 • 방해 금지 시간대',
        '알림 내역': '받은 알림 목록 조회 • 읽음/안읽음 표시 • 알림 삭제',
        
        // 포인트/쿠폰
        '포인트 적립': '구매 금액 비율 적립 • 이벤트 적립 • 적립 예정 포인트 표시',
        '포인트 사용': '결제 시 포인트 차감 • 최소 사용 금액 • 사용 취소 시 복원',
        '포인트 소멸': '유효기간 만료 전 알림 • 소멸 예정 포인트 표시 • 소멸 이력 관리',
        '적립 내역': '적립 일시/사유/금액 조회 • 기간별 필터 • 엑셀 다운로드',
        '사용 내역': '사용 일시/내역/금액 조회 • 주문 연동 • 취소 환원 표시',
        '등급별 적립률': '회원 등급별 적립률 차등 • 등급 현황 표시 • 승급 안내',
        '쿠폰 발급': '쿠폰 코드 생성/발급 • 발급 대상 설정 • 발급 이력 관리',
        '쿠폰 사용': '쿠폰 선택/적용 • 사용 조건 검증 • 할인 금액 계산',
        '쿠폰 유형': '정액/정률 할인 • 배송비 무료 • 사은품 증정',
        '쿠폰 유효기간': '발급일 기준/고정 기간 • 만료 임박 알림 • 만료 쿠폰 처리',
        '중복 사용': '쿠폰 중복 사용 가능 여부 • 최대 사용 개수 • 조합 제한',
        '최소 주문금액': '쿠폰별 최소 금액 조건 • 미충족 시 사용 불가 표시 • 조건 안내',
        
        // 예약
        '날짜/시간 선택': '캘린더 날짜 선택 • 시간대 선택 • 예약 불가 일시 표시',
        '인원 선택': '예약 인원 설정 • 최소/최대 인원 제한 • 인원별 가격 차등',
        '예약 확인': '예약 정보 최종 확인 • 예약 확정 처리 • 확인 알림 발송',
        '예약 취소': '취소 정책 안내 • 취소 수수료 계산 • 환불 처리',
        '예약 변경': '날짜/시간/인원 변경 • 변경 가능 기간 • 차액 정산',
        '노쇼 정책': '노쇼 기준 안내 • 패널티 부과 • 노쇼 이력 관리',
        '대기 예약': '예약 만석 시 대기 등록 • 대기 순번 표시 • 자리 발생 시 알림',
        '수업 선택': '수업 목록/상세 조회 • 난이도/강사 필터 • 수업 설명 확인',
        '일정 확인': '수업 스케줄 캘린더 • 예약 가능 여부 • 정원 현황',
        '강사 선택': '강사 프로필 조회 • 강사별 일정 확인 • 지명 예약',
        '정원 확인': '현재 예약 인원/정원 표시 • 마감 임박 알림 • 대기 신청',
        '출석 체크': 'QR/바코드 출석 • 수동 출석 처리 • 출석 현황 대시보드',
        '트레이너 선택': 'PT 트레이너 목록 • 전문 분야/경력 확인 • 가능 시간대 조회',
        '가능 시간 조회': '트레이너 스케줄 확인 • 예약 가능 시간 표시 • 선호 시간 저장',
        '횟수 차감': 'PT 잔여 횟수 표시 • 예약 시 자동 차감 • 취소 시 복원',
        '디자이너 프로필': '디자이너 사진/소개 • 경력/자격증 • 시술 스타일',
        '포트폴리오': '시술 사례 이미지 • 비포/애프터 • 고객 후기 연동',
        '가격표': '시술별 가격 목록 • 옵션별 추가 요금 • 패키지 가격',
        '예약 가능 시간': '디자이너별 예약 현황 • 실시간 업데이트 • 빈 시간 알림',
        '지명 예약': '선호 디자이너 지명 • 지명비 추가 • 지명 이력 관리',
        '리뷰 확인': '디자이너별 리뷰 조회 • 평점 통계 • 스타일 태그',
        '테이블 배치도': '매장 테이블 레이아웃 • 테이블별 정보 (인원/위치) • 선호 좌석 표시',
        '좌석 선택': '원하는 테이블 선택 • 좌석 유형 필터 • 선택 불가 표시',
        '인원수 설정': '예약 인원 입력 • 테이블 수용 인원 확인 • 분산 배치 옵션',
        '특별 요청': '요청 사항 텍스트 입력 • 아기의자/휠체어 등 옵션 • 알레르기 정보',
        '프라이빗룸': '프라이빗룸 예약 • 최소 인원/이용료 • 룸 사진 확인',
        '좌석 유형': '홀/룸/테라스 등 유형 • 유형별 필터 • 가격 차등 표시',
        '원격 줄서기': '앱에서 대기 등록 • 현재 대기 수/예상 시간 • 호출 알림',
        '대기 순번 확인': '실시간 순번 조회 • 앞 대기 수 표시 • 순번 변동 알림',
        '예상 대기시간': '평균 대기시간 계산 • 실시간 업데이트 • 도착 예정 시간 안내',
        '호출 알림': '순번 도래 시 푸시 알림 • 입장 가능 시간 • 미입장 시 취소 안내',
        '방문 확인': '매장 도착 체크인 • 대기 완료 처리 • 노쇼 방지',
        
        // 건강/의료
        '진료과 선택': '진료과 목록 조회 • 진료과별 질환 안내 • 진료과 추천',
        '의료진 검색': '의료진 이름/전문 분야 검색 • 필터 (경력/학력/진료일) • 프로필 상세',
        '전문 분야': '의료진 전문 분야 표시 • 관련 질환 • 시술/수술 경험',
        '진료 스케줄': '의료진별 진료 일정 • 휴진일 표시 • 예약 가능 시간',
        '평점/리뷰': '환자 리뷰 조회 • 평점 통계 • 리뷰 작성 (진료 후)',
        '경력 정보': '학력/경력 상세 • 소속 학회 • 논문/저서',
        '화상 진료 신청': '비대면 진료 가능 여부 확인 • 증상 사전 입력 • 예약 및 결제',
        '증상 입력': '증상 선택 및 텍스트 입력 • 증상 시작 시점 • 사진/영상 첨부',
        '대기실 입장': '진료 시작 전 대기 • 예상 대기시간 • 진료 준비 안내',
        '화상 연결': 'WebRTC 화상 통화 • 화면/음성 제어 • 연결 상태 표시',
        '처방전 발급': '전자 처방전 발급 • 약국 전송 • 처방전 조회/출력',
        '진료 기록': '진료 일시/내용 기록 • 진단명/소견 • 처방 내역',
        '진료 내역 조회': '과거 진료 이력 목록 • 기간/진료과 필터 • 상세 조회',
        '처방전 조회': '발급 처방전 목록 • 유효기간 확인 • 재발급 요청',
        '검사 결과': '혈액검사/영상 등 결과 조회 • 정상 범위 비교 • 추이 그래프',
        '진단서 발급': '진단서 종류 선택 • 용도 입력 • 발급비 결제',
        '의료 기록 공유': '타 병원 기록 공유 동의 • 공유 범위 설정 • 공유 이력',
        '병원 연동': '마이데이터 기반 병원 연동 • 진료 기록 통합 조회',
        '복약 안내': '처방약 복용 방법 • 주의사항 • 부작용 안내',
        '처방 이력': '과거 처방 내역 조회 • 약 정보 확인 • 복용 기록',
        '약국 검색': '주변 약국 지도 검색 • 영업시간 확인 • 처방전 전송',
        '약 배송': '처방약 배송 신청 • 배송 추적 • 수령 확인',
        '복약 알림': '복용 시간 알림 설정 • 복용 체크 • 복약 기록',
        '검진 프로그램': '검진 패키지 목록 • 검사 항목 상세 • 소요시간/비용',
        '검진 예약': '검진 일정 선택 • 검진 전 주의사항 • 예약 확인',
        '검진 결과': '검진 결과 리포트 • 항목별 상세 • 전년 대비 비교',
        '이상 소견 안내': '이상 소견 항목 표시 • 추가 검사 권고 • 진료과 연결',
        '추적 관찰': '정기 검진 알림 • 과거 결과 비교 • 건강 추이 분석',
        '건강 리포트': '종합 건강 리포트 • PDF 다운로드 • 의료진 코멘트',
        '증상 입력': '증상 체크리스트 선택 • 발생 시점/빈도 • 통증 부위 표시',
        '예상 질환': 'AI 기반 예상 질환 도출 • 확률 표시 • 유사 증상 질환',
        '진료과 추천': '증상 기반 진료과 추천 • 가까운 병원 연결 • 예약 연동',
        '주의사항 안내': '응급 상황 안내 • 자가 관리 방법 • 병원 방문 기준',
        '건강 지표 입력': '혈압/혈당/체중 등 입력 • 입력 UI (숫자/슬라이더) • 단위 설정',
        '측정 기록': '일별 측정값 기록 • 측정 기기 연동 • 자동 기록',
        '추이 그래프': '기간별 추이 시각화 • 목표 대비 현황 • 분석 코멘트',
        '목표 설정': '건강 목표 설정 • 달성률 표시 • 목표 수정',
        '이상 알림': '정상 범위 이탈 시 알림 • 알림 기준 설정 • 기록 연동',
        '공유 기능': '가족/의료진 공유 • 공유 권한 설정 • 공유 이력',
        '반려동물 정보': '반려동물 종류/품종/나이 • 기본 건강 정보 • 프로필 사진',
        '수의사 매칭': '증상 기반 전문 수의사 추천 • 수의사 프로필 • 상담 예약',
        '상담 예약': '온라인/방문 상담 선택 • 가능 일시 확인 • 예약 확정',
        '처방 안내': '처방약 정보 • 투여 방법 • 주의사항',
        '접종 일정': '예방접종 스케줄 • 접종 시기 알림 • 접종 기록',
        '접종 기록': '접종 이력 관리 • 접종 증명서 • 다음 접종 안내',
        '다음 접종 알림': '접종 예정일 알림 • 접종 예약 연동 • 리마인드 설정',
        '접종 증명서': '예방접종 증명서 발급 • PDF 다운로드 • 병원 직인',
        '병원 예약 연동': '동물병원 예약 • 접종 일정 연동 • 진료 기록 통합',
        
        // 관리자
        '주요 지표': 'KPI 대시보드 (매출/회원/주문) • 전일/전주/전월 비교 • 목표 달성률',
        '실시간 현황': '실시간 주문/접속자 현황 • 자동 새로고침 • 이상 징후 알림',
        '매출 통계': '일별/주별/월별 매출 추이 • 상품별/카테고리별 매출 • 결제수단별 통계',
        '회원 통계': '신규가입/탈퇴 추이 • 활성 회원 수 • 등급별/연령대별 분포',
        '주문 통계': '주문 건수/금액 통계 • 상태별 현황 • 취소/반품률',
        '알림': '관리자 알림 목록 • 중요 알림 표시 • 알림 설정',
        '회원 목록': '전체 회원 검색/필터 • 정렬 옵션 • 엑셀 다운로드',
        '회원 상세': '회원 정보 상세 조회 • 주문/적립금/쿠폰 이력 • 활동 로그',
        '등급 변경': '회원 등급 수동 변경 • 변경 사유 입력 • 알림 발송',
        '포인트 지급': '수동 포인트 지급/차감 • 지급 사유 • 이력 관리',
        '휴면 처리': '휴면 계정 전환 • 휴면 해제 • 휴면 안내 메일',
        '탈퇴 처리': '관리자 탈퇴 처리 • 탈퇴 사유 기록 • 데이터 보관 정책',
        '주문 목록': '전체 주문 검색/필터 • 상태별 탭 • 일괄 처리',
        '주문 상세': '주문 정보 상세 조회 • 결제/배송 정보 • 히스토리',
        '주문 상태 변경': '입금확인/배송준비/배송중 등 변경 • 자동 알림 • 이력 기록',
        '배송 처리': '운송장 등록 • 배송사 연동 • 출고 처리',
        '취소/환불 처리': '취소/환불 승인 • 환불 금액 조정 • 환불 실행',
        '일괄 처리': '다건 주문 일괄 상태 변경 • 일괄 출고 • 엑셀 업로드'
    };
    
    // 상세 스펙 가져오기 함수
    const getOptionSpec = (opt) => {
        // optionSpecs에서 상세 스펙 찾기
        if (optionSpecs[opt]) {
            const value = optionSpecs[opt];
            // 문자열인 경우 simple 형태로 변환
            if (typeof value === 'string') {
                return { simple: value };
            }
            return value;
        }
        // 부분 매칭 시도
        const specKeys = Object.keys(optionSpecs);
        const matchedSpec = specKeys.find(key => opt.includes(key) || key.includes(opt));
        if (matchedSpec) {
            const value = optionSpecs[matchedSpec];
            // 문자열인 경우 simple 형태로 변환
            if (typeof value === 'string') {
                return { simple: value };
            }
            return value;
        }
        // 기본 스펙 생성
        return {
            ui: [
                { type: '화면', name: `${opt} 메인`, style: '기본 레이아웃' },
                { type: '버튼', name: '확인', style: '활성화 버튼' },
                { type: '버튼', name: '취소', style: '비활성화 버튼' }
            ],
            actions: [
                { trigger: '화면 진입', action: `${opt} 데이터 로딩 및 표시` },
                { trigger: '확인 클릭', action: '데이터 저장 후 완료 처리' },
                { trigger: '취소 클릭', action: '변경사항 취소 후 이전 화면 이동' }
            ],
            alerts: [
                { condition: '저장 성공', title: '완료', message: `${opt} 처리가 완료되었습니다.`, buttons: ['확인 → 팝업 닫기'] },
                { condition: '저장 실패', title: '오류', message: '처리 중 오류가 발생했습니다. 다시 시도해주세요.', buttons: ['확인 → 팝업 닫기'] }
            ]
        };
    };
    
    // 상세 스펙을 HTML로 변환
    const renderOptionSpec = (opt, spec, idx) => {
        // 간단 설명만 있는 경우
        if (spec.simple) {
            return `
                <div class="func-spec-item">
                    <div class="spec-header">
                        <span class="spec-name">${opt}</span>
                        <span class="${idx < 3 ? 'required' : 'optional'}">${idx < 3 ? '필수' : '선택'}</span>
                    </div>
                    <div class="spec-simple">${spec.simple}</div>
                </div>
            `;
        }
        
        // UI 컴포넌트별 상세 설명 생성
        const renderUIDetail = (u) => {
            let details = [];
            
            // 유형별 상세 설명
            switch(u.type) {
                case '입력':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">입력 형식</span>
                                    <span class="detail-value">${u.placeholder || u.format || '자유 입력'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">유효성 검사</span>
                                    <span class="detail-value">${u.validation || '없음'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">최대 길이</span>
                                    <span class="detail-value">${u.maxLength ? u.maxLength + '자' : '제한 없음'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">입력 시 동작</span>
                                    <span class="detail-value">실시간 유효성 검사, 오류 시 필드 하단 빨간색 에러 메시지 표시</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">포커스 아웃 시</span>
                                    <span class="detail-value">최종 유효성 검사 실행, 통과 시 녹색 체크 표시</span>
                                </div>
                                ${u.error ? `<div class="detail-row error"><span class="detail-label">에러 메시지</span><span class="detail-value">"${u.error}"</span></div>` : ''}
                            </div>
                        </div>
                    `);
                    break;
                    
                case '버튼':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">스타일</span>
                                    <span class="detail-value">${u.style || '기본 버튼'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">클릭 시 동작</span>
                                    <span class="detail-value">${u.onClick || '해당 기능 실행'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">비활성화 조건</span>
                                    <span class="detail-value">${u.disabled || '필수 입력값 미입력 시'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">로딩 상태</span>
                                    <span class="detail-value">클릭 후 스피너 표시, 버튼 비활성화, 중복 클릭 방지</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">성공 시</span>
                                    <span class="detail-value">${u.success || '완료 메시지 표시 또는 다음 화면 이동'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">실패 시</span>
                                    <span class="detail-value">${u.failure || '에러 팝업 표시, 버튼 원래 상태로 복구'}</span>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                    
                case '셀렉트':
                case '라디오':
                case '체크박스':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">선택 옵션</span>
                                    <span class="detail-value">${Array.isArray(u.options) ? u.options.join(' / ') : (u.options || '동적 로딩')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">기본값</span>
                                    <span class="detail-value">${u.defaultValue || '선택 없음'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">선택 시 동작</span>
                                    <span class="detail-value">${u.onChange || '선택값 저장, 연관 UI 업데이트'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">필수 여부</span>
                                    <span class="detail-value">${u.required ? '필수 (미선택 시 다음 단계 진행 불가)' : '선택사항'}</span>
                                </div>
                                ${u.type === '체크박스' ? `
                                <div class="detail-row">
                                    <span class="detail-label">체크 시</span>
                                    <span class="detail-value">체크 아이콘 표시, 관련 기능 활성화</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">해제 시</span>
                                    <span class="detail-value">빈 박스 표시, 관련 기능 비활성화</span>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    `);
                    break;
                    
                case '스테퍼':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">구성</span>
                                    <span class="detail-value">[-] 버튼 + 숫자 표시 + [+] 버튼</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">기본값</span>
                                    <span class="detail-value">${u.defaultValue || '1'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">최소값</span>
                                    <span class="detail-value">${u.min || '1'} (미만 시 [-] 버튼 비활성화)</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">최대값</span>
                                    <span class="detail-value">${u.max || '99'} (초과 시 [+] 버튼 비활성화)</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">[-] 클릭 시</span>
                                    <span class="detail-value">수량 1 감소, 관련 금액 실시간 재계산</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">[+] 클릭 시</span>
                                    <span class="detail-value">수량 1 증가, 관련 금액 실시간 재계산</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">직접 입력 시</span>
                                    <span class="detail-value">숫자만 허용, 범위 초과 시 자동 보정</span>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                    
                case '캘린더':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">표시 형식</span>
                                    <span class="detail-value">월간 캘린더, 이전/다음 월 네비게이션</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">선택 가능일</span>
                                    <span class="detail-value">오늘 이후 날짜 (과거 날짜 회색 비활성화)</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">예약 불가일</span>
                                    <span class="detail-value">회색 처리 + 취소선, 클릭 시 "예약 마감" 토스트</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">날짜 선택 시</span>
                                    <span class="detail-value">해당 날짜 하이라이트, 시간대 데이터 로딩</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">특수일 표시</span>
                                    <span class="detail-value">공휴일 빨간색, 주말 회색 배경</span>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                    
                case '모달':
                case '바텀시트':
                case '팝업':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">스타일</span>
                                    <span class="detail-value">${u.style || (u.type === '바텀시트' ? '하단에서 슬라이드업' : '화면 중앙 오버레이')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">오픈 시</span>
                                    <span class="detail-value">배경 딤 처리(반투명 검정), 스크롤 잠금</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">닫기 방법</span>
                                    <span class="detail-value">X 버튼 클릭 / 배경 클릭 / ESC 키</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">닫힘 시</span>
                                    <span class="detail-value">애니메이션과 함께 닫힘, 배경 딤 해제, 스크롤 복원</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">애니메이션</span>
                                    <span class="detail-value">${u.type === '바텀시트' ? '하단→상단 슬라이드' : '페이드인/스케일업'} (300ms)</span>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                    
                case '업로드':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">업로드 방식</span>
                                    <span class="detail-value">클릭하여 파일 선택 / 드래그앤드롭</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">허용 형식</span>
                                    <span class="detail-value">${u.accept || 'JPG, PNG, GIF (이미지) / PDF, DOC (문서)'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">최대 용량</span>
                                    <span class="detail-value">${u.maxSize || '10MB'} (초과 시 에러 메시지)</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">최대 개수</span>
                                    <span class="detail-value">${u.maxCount || '10'}개 (초과 시 선택 불가)</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">업로드 중</span>
                                    <span class="detail-value">프로그레스 바 표시, 취소 버튼 제공</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">업로드 완료</span>
                                    <span class="detail-value">썸네일 미리보기, X 삭제 버튼 표시</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">삭제 클릭 시</span>
                                    <span class="detail-value">"삭제하시겠습니까?" 확인 후 삭제</span>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                    
                case '탭':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">탭 목록</span>
                                    <span class="detail-value">${Array.isArray(u.options) ? u.options.join(' | ') : (u.options || '동적 로딩')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">기본 선택</span>
                                    <span class="detail-value">첫 번째 탭 활성화</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">탭 클릭 시</span>
                                    <span class="detail-value">해당 탭 활성화(하단 인디케이터), 콘텐츠 영역 전환</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">비활성 탭</span>
                                    <span class="detail-value">회색 텍스트, 클릭 시 활성화</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">전환 애니메이션</span>
                                    <span class="detail-value">슬라이드 또는 페이드 (200ms)</span>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                    
                case '별점':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">구성</span>
                                    <span class="detail-value">별 아이콘 5개 (☆☆☆☆☆ → ★★★★★)</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">선택 방식</span>
                                    <span class="detail-value">클릭 또는 드래그로 1~5점 선택</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">호버 시</span>
                                    <span class="detail-value">해당 점수까지 별 채워짐 미리보기</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">클릭 시</span>
                                    <span class="detail-value">점수 확정, 별 채워짐 애니메이션</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">점수 표시</span>
                                    <span class="detail-value">"${u.labels || '1점-별로예요 / 2점-그저그래요 / 3점-보통이에요 / 4점-좋아요 / 5점-최고예요'}"</span>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                    
                case '슬라이더':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">구성</span>
                                    <span class="detail-value">${u.style || '트랙 + 핸들 (양쪽 핸들로 범위 선택)'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">범위</span>
                                    <span class="detail-value">${u.min || '0'} ~ ${u.max || '100'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">드래그 시</span>
                                    <span class="detail-value">핸들 이동, 현재값 툴팁 표시</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">값 변경 시</span>
                                    <span class="detail-value">실시간 결과 필터링/업데이트</span>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                    
                case '토글':
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">스타일</span>
                                    <span class="detail-value">${u.style || 'ON/OFF 스위치 형태'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">OFF 상태</span>
                                    <span class="detail-value">회색 배경, 좌측 핸들</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">ON 상태</span>
                                    <span class="detail-value">활성 색상 배경, 우측 핸들</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">클릭 시</span>
                                    <span class="detail-value">상태 전환 애니메이션 (200ms), 설정값 즉시 저장</span>
                                </div>
                            </div>
                        </div>
                    `);
                    break;
                    
                case '텍스트':
                case '리스트':
                case '표':
                case '그리드':
                case '카운터':
                case '썸네일':
                case '태그':
                case '아이콘':
                case '링크':
                default:
                    details.push(`
                        <div class="ui-detail-card">
                            <div class="ui-detail-header">
                                <span class="ui-type">${u.type}</span>
                                <strong>${u.name}</strong>
                            </div>
                            <div class="ui-detail-body">
                                <div class="detail-row">
                                    <span class="detail-label">스타일</span>
                                    <span class="detail-value">${u.style || '기본 스타일'}</span>
                                </div>
                                ${u.options ? `<div class="detail-row"><span class="detail-label">옵션/내용</span><span class="detail-value">${Array.isArray(u.options) ? u.options.join(', ') : u.options}</span></div>` : ''}
                                ${u.placeholder ? `<div class="detail-row"><span class="detail-label">표시 형식</span><span class="detail-value">${u.placeholder}</span></div>` : ''}
                                ${u.type === '링크' ? `
                                <div class="detail-row">
                                    <span class="detail-label">클릭 시</span>
                                    <span class="detail-value">해당 페이지/팝업으로 이동</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">호버 시</span>
                                    <span class="detail-value">밑줄 표시, 커서 포인터</span>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    `);
            }
            
            return details.join('');
        };
        
        // UI 컴포넌트 상세 카드 생성
        const uiCards = spec.ui ? spec.ui.map(u => renderUIDetail(u)).join('') : '';
        
        // 동작 정의 테이블
        const actionRows = spec.actions ? spec.actions.map(a => `
            <tr><td>${a.trigger}</td><td>→</td><td>${a.action}</td></tr>
        `).join('') : '';
        
        // 알럿/팝업 정의
        const alertRows = spec.alerts ? spec.alerts.map(al => `
            <div class="alert-spec">
                <div class="alert-condition"><strong>조건:</strong> ${al.condition}</div>
                <div class="alert-popup">
                    <div class="popup-preview">
                        <div class="popup-title">${al.title}</div>
                        <div class="popup-message">${al.message}</div>
                        <div class="popup-buttons">${al.buttons.map(b => `<span class="popup-btn">${b.split(' → ')[0]}</span>`).join('')}</div>
                    </div>
                    <div class="button-actions">
                        ${al.buttons.map(b => {
                            const [btn, action] = b.split(' → ');
                            return `<div class="btn-action"><strong>${btn}</strong>: ${action || '동작 없음'}</div>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `).join('') : '';
        
        return `
            <div class="func-spec-item">
                <div class="spec-header">
                    <span class="spec-name">${opt}</span>
                    <span class="${idx < 3 ? 'required' : 'optional'}">${idx < 3 ? '필수' : '선택'}</span>
                </div>
                
                ${spec.ui ? `
                <div class="spec-section">
                    <h6>📱 화면 구성 상세</h6>
                    <div class="ui-detail-grid">
                        ${uiCards}
                    </div>
                </div>
                ` : ''}
                
                ${spec.actions ? `
                <div class="spec-section">
                    <h6>⚡ 동작 흐름</h6>
                    <table class="spec-table action-table">
                        <thead><tr><th>트리거 (사용자 액션)</th><th></th><th>시스템 동작</th></tr></thead>
                        <tbody>${actionRows}</tbody>
                    </table>
                </div>
                ` : ''}
                
                ${spec.alerts && spec.alerts.length > 0 ? `
                <div class="spec-section">
                    <h6>💬 팝업/얼럿 메시지</h6>
                    ${alertRows}
                </div>
                ` : ''}
            </div>
        `;
    };
    
    // 옵션에 따른 동적 기능 항목 생성
    const optionItems = options.map((opt, idx) => {
        const spec = getOptionSpec(opt);
        return renderOptionSpec(opt, spec, idx);
    }).join('');
    
    // 화면 구성 요소 생성
    const screenElements = options.slice(0, 6).map(opt => `
        <div class="element"><span class="el-type">[UI]</span> ${opt} 영역</div>
    `).join('');
    
    return `
        <div class="func-doc-header">
            <div class="doc-meta">
                <div class="meta-item"><span class="meta-label">문서 ID</span><span class="meta-value">${docId}</span></div>
                <div class="meta-item"><span class="meta-label">버전</span><span class="meta-value">v1.0</span></div>
                <div class="meta-item"><span class="meta-label">작성일</span><span class="meta-value">${new Date().toLocaleDateString('ko-KR')}</span></div>
                <div class="meta-item"><span class="meta-label">업종</span><span class="meta-value">${industryName}</span></div>
                <div class="meta-item"><span class="meta-label">분류</span><span class="meta-value">${info.category}</span></div>
            </div>
        </div>

        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                ${info.steps.map((step, idx) => `
                    <div class="journey-step ${idx === info.steps.length - 1 ? 'completed' : ''}">
                        <span class="step-num">${idx + 1}</span>
                        <span class="step-title">${step}</span>
                    </div>
                    ${idx < info.steps.length - 1 ? '<div class="journey-arrow">→</div>' : ''}
                `).join('')}
            </div>
        </div>

        <div class="func-section">
            <h4>1. 기능 개요</h4>
            <div class="func-overview">
                <p><strong>기능명:</strong> ${info.icon} ${funcName}</p>
                <p><strong>기능 목적:</strong> ${info.purpose}</p>
                <p><strong>접근 경로:</strong> 메인 > ${info.category} > ${funcName}</p>
                <p><strong>권한:</strong> 로그인 사용자 (일부 기능 비회원 허용)</p>
            </div>
        </div>

        <div class="func-section">
            <h4>2. 화면 구성 (Screen Layout)</h4>
            <div class="screen-layout">
                <div class="screen-item">
                    <h5>2.1 ${funcName} 메인 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[헤더]</span> 페이지 타이틀 및 안내</div>
                        ${screenElements}
                        <div class="element"><span class="el-type">[버튼]</span> 주요 액션 버튼</div>
                        <div class="element"><span class="el-type">[안내]</span> 도움말/가이드</div>
                    </div>
                </div>
                <div class="screen-item">
                    <h5>2.2 상세/결과 화면</h5>
                    <div class="screen-elements">
                        <div class="element"><span class="el-type">[결과]</span> 처리 결과 표시 영역</div>
                        <div class="element"><span class="el-type">[상세]</span> 상세 정보 영역</div>
                        <div class="element"><span class="el-type">[버튼]</span> 다음 단계/완료 버튼</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="func-section func-spec-section">
            <h4>3. 선택된 기능 상세 스펙</h4>
            <div class="func-spec-container">
                ${optionItems || '<div class="empty-spec">선택된 옵션이 없습니다</div>'}
            </div>
        </div>

        <div class="func-section">
            <h4>4. 데이터 정의</h4>
            <div class="func-table detail">
                <div class="func-row header"><span>필드명</span><span>데이터 타입</span><span>설명</span><span>필수</span></div>
                <div class="func-row"><span>id</span><span>BIGINT</span><span>고유 식별자 (PK, Auto Increment)</span><span class="required">Y</span></div>
                <div class="func-row"><span>user_id</span><span>BIGINT</span><span>사용자 ID (FK)</span><span class="required">Y</span></div>
                <div class="func-row"><span>type</span><span>VARCHAR(50)</span><span>${funcName} 유형</span><span class="required">Y</span></div>
                <div class="func-row"><span>status</span><span>VARCHAR(20)</span><span>상태 (대기/진행/완료/취소)</span><span class="required">Y</span></div>
                <div class="func-row"><span>data</span><span>JSON</span><span>상세 데이터</span><span class="optional">N</span></div>
                <div class="func-row"><span>created_at</span><span>DATETIME</span><span>생성일시</span><span class="required">Y</span></div>
                <div class="func-row"><span>updated_at</span><span>DATETIME</span><span>수정일시</span><span class="required">Y</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>5. 비즈니스 규칙</h4>
            <ul class="func-list">
                <li><strong>접근 권한:</strong> ${industryName} 업종 특성에 맞는 권한 체계 적용</li>
                <li><strong>데이터 보관:</strong> 관련 법규에 따른 데이터 보관 기간 준수</li>
                <li><strong>처리 기준:</strong> ${funcName} 처리 기준 및 정책 적용</li>
                ${options.slice(0, 3).map(opt => `<li><strong>${opt}:</strong> ${opt} 관련 비즈니스 규칙 적용</li>`).join('')}
            </ul>
        </div>

        <div class="func-section">
            <h4>6. 에러 처리</h4>
            <div class="func-table">
                <div class="func-row header"><span>에러 상황</span><span>에러 메시지</span><span>처리 방법</span></div>
                <div class="func-row"><span>필수 항목 누락</span><span>"필수 항목을 입력해주세요"</span><span>누락 필드 하이라이트</span></div>
                <div class="func-row"><span>유효성 검증 실패</span><span>"입력 정보를 확인해주세요"</span><span>오류 필드 표시</span></div>
                <div class="func-row"><span>권한 없음</span><span>"접근 권한이 없습니다"</span><span>로그인/권한 안내</span></div>
                <div class="func-row"><span>처리 실패</span><span>"처리 중 오류가 발생했습니다"</span><span>재시도 안내</span></div>
                <div class="func-row"><span>네트워크 오류</span><span>"네트워크 연결을 확인해주세요"</span><span>재시도 버튼</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>7. API 연동</h4>
            <div class="func-table">
                <div class="func-row header"><span>API</span><span>메소드</span><span>설명</span></div>
                <div class="func-row"><span>/api/${funcType}</span><span>GET</span><span>${funcName} 목록/상세 조회</span></div>
                <div class="func-row"><span>/api/${funcType}</span><span>POST</span><span>${funcName} 생성/등록</span></div>
                <div class="func-row"><span>/api/${funcType}/{id}</span><span>PUT</span><span>${funcName} 수정</span></div>
                <div class="func-row"><span>/api/${funcType}/{id}</span><span>DELETE</span><span>${funcName} 삭제</span></div>
                <div class="func-row"><span>/api/${funcType}/{id}/status</span><span>PATCH</span><span>${funcName} 상태 변경</span></div>
            </div>
        </div>

        <div class="func-section">
            <h4>8. 연관 기능</h4>
            <div class="func-related">
                <div class="related-item"><span class="related-icon">👤</span> 회원가입/로그인</div>
                <div class="related-item"><span class="related-icon">📱</span> 알림/푸시</div>
                <div class="related-item"><span class="related-icon">📊</span> 관리자 대시보드</div>
                <div class="related-item"><span class="related-icon">💳</span> 결제 (해당 시)</div>
            </div>
        </div>

        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <div class="analysis-content">
                <p><strong>참조 프로젝트:</strong> ${industryName} 업종 유사 프로젝트 ${refCount}건 분석</p>
                <p><strong>법규 준수:</strong> 개인정보보호법, 정보통신망법 등 관련 법규 반영</p>
                <p><strong>UX 벤치마킹:</strong> ${industryName} 업종 Top 10 서비스 ${funcName} 기능 분석</p>
                <p><strong>선택 옵션:</strong> ${options.length}개 옵션 적용됨</p>
            </div>
        </div>
    `;
}

function updateCompatibilityResult() {
    const platform = document.getElementById('techPlatform')?.value;
    const frontend = document.querySelector('input[name="frontend"]:checked')?.value;
    const alert = document.querySelector('.compatibility-alert');
    
    if (!alert) return;
    
    // Simple compatibility check
    const incompatible = (platform === 'cafe24' && frontend === 'react');
    
    if (incompatible) {
        alert.classList.remove('success');
        alert.classList.add('warning');
        alert.innerHTML = `
            <div class="alert-icon">⚠️</div>
            <div class="alert-content">
                <h4>호환성 경고</h4>
                <p>Cafe24는 PHP 기반 플랫폼입니다. React 직접 연동에 어려움이 있을 수 있습니다.</p>
            </div>
        `;
    } else {
        alert.classList.remove('warning');
        alert.classList.add('success');
        alert.innerHTML = `
            <div class="alert-icon">✅</div>
            <div class="alert-content">
                <h4>호환성 확인 완료</h4>
                <p>선택하신 기술 스택은 플랫폼과 호환됩니다.</p>
            </div>
        `;
    }
}

// ============================================
// WBS Form
// ============================================

function initWBSForm() {
    const form = document.getElementById('wbsForm');
    const resultCard = document.querySelector('.wbs-result-card');
    const projectTypeSelect = document.getElementById('wbsProjectType');
    const platformSelect = document.getElementById('wbsPlatform');
    const scaleSelect = document.getElementById('wbsScale');
    const featuresContainer = document.getElementById('wbsFeatures');

    // 프로젝트 유형별 주요 기능
    const projectTypeFeatures = {
        // 웹사이트
        commerce: ['회원 기능', '장바구니', '결제 기능', '배송 기능', '상품 관리', '재고 관리', '리뷰/후기', '쿠폰/적립금', '반응형', '관리자 페이지'],
        brand: ['메인 비주얼', '브랜드 스토리', '제품 소개', '매장 찾기', '뉴스/PR', '채용 정보', '반응형', '다국어', '모션/인터랙션', 'SNS 연동'],
        corporate: ['회사 소개', '사업 영역', '연혁', '조직도', '뉴스/공지', '채용', '문의하기', '반응형', '관리자 페이지', 'SEO 최적화'],
        landing: ['메인 비주얼', '제품/서비스 소개', 'CTA 버튼', '문의 폼', '반응형', '애니메이션', 'A/B 테스트', '전환 추적', 'SNS 공유'],
        portal: ['회원 기능', '게시판', '검색', '카테고리', '댓글/좋아요', '알림', '반응형', '관리자 페이지', 'SEO 최적화', '통계'],
        media: ['콘텐츠 관리', '카테고리', '검색', '구독/뉴스레터', '공유 기능', '반응형', 'SEO 최적화', '광고 영역', '관리자 페이지'],
        promotion: ['메인 비주얼', '이벤트 참여', '당첨자 발표', '공유 기능', '반응형', '애니메이션', '카운트다운', '모바일 최적화'],
        // 플랫폼/서비스
        booking: ['회원 기능', '예약 시스템', '캘린더', '결제 기능', '알림/푸시', '관리자 페이지', '리뷰', '반응형', '대시보드', '통계'],
        membership: ['회원 기능', '등급 시스템', '포인트', '쿠폰', '결제/구독', '마이페이지', '알림', '반응형', '관리자 페이지', '통계'],
        saas: ['회원 기능', '대시보드', '요금제/결제', 'API 연동', '팀/권한 관리', '알림', '통계/리포트', '반응형', '온보딩', '고객지원'],
        b2b: ['회원 기능', '견적 시스템', '주문 관리', '결제', '재고 관리', '거래처 관리', '정산', '관리자 페이지', '통계', '엑셀 연동'],
        marketplace: ['회원 기능', '판매자 관리', '상품 관리', '결제/정산', '배송', '리뷰', '검색/필터', '관리자 페이지', '통계', '알림'],
        ott: ['회원 기능', '콘텐츠 관리', '스트리밍', '구독 결제', '추천 시스템', '검색', '찜/재생목록', '반응형', '다운로드', '프로필 관리'],
        lms: ['회원 기능', '강좌 관리', '동영상 플레이어', '진도 관리', '과제/퀴즈', '수료증', '결제', '대시보드', '통계', '관리자 페이지'],
        // 앱/모바일
        webapp: ['회원 기능', 'PWA 설정', '오프라인 지원', '푸시 알림', '홈화면 추가', '반응형', '터치 최적화', '캐시 관리'],
        hybrid: ['회원 기능', '네이티브 연동', '푸시 알림', '카메라/갤러리', '위치 서비스', '스토어 배포', '딥링크', '앱 업데이트'],
        native: ['회원 기능', 'UI/UX 설계', '네이티브 개발', '푸시 알림', '위치 서비스', 'API 연동', '스토어 배포', '인앱 결제', '앱 분석'],
        // 공공/특수
        public: ['접근성(WCAG)', '보안 인증', '전자정부 프레임워크', '회원 기능', '민원 시스템', '게시판', '검색', '관리자 페이지', '통계', '다국어'],
        intranet: ['회원/권한 관리', '전자결재', '게시판', '일정 관리', '조직도', '메신저', '파일 공유', '검색', '통계', 'SSO 연동'],
        erp: ['회원/권한 관리', '대시보드', '모듈 연동', '데이터 마이그레이션', '리포트', '엑셀 연동', 'API 개발', '통계', '백업/복구', '교육']
    };

    // 프로젝트 유형명
    const projectTypeNames = {
        commerce: '쇼핑몰/커머스', brand: '브랜드 사이트', corporate: '기업 홈페이지',
        landing: '랜딩 페이지', portal: '포털/커뮤니티', media: '미디어/매거진',
        promotion: '프로모션/이벤트', booking: '예약 플랫폼', membership: '멤버십/구독',
        saas: 'SaaS/웹서비스', b2b: 'B2B 플랫폼', marketplace: '마켓플레이스',
        ott: 'OTT/스트리밍', lms: 'LMS/교육', webapp: '웹앱(PWA)',
        hybrid: '하이브리드 앱', native: '네이티브 앱', public: '공공기관',
        intranet: '인트라넷', erp: 'ERP/관리시스템'
    };

    // 규모별 기간 배수
    const scaleMultiplier = {
        small: 0.5,
        medium: 1,
        large: 2,
        enterprise: 3
    };

    // 프로젝트 유형 변경 시 주요 기능 업데이트
    projectTypeSelect?.addEventListener('change', () => {
        const projectType = projectTypeSelect.value;
        const features = projectTypeFeatures[projectType] || projectTypeFeatures['commerce'];
        
        if (featuresContainer) {
            featuresContainer.innerHTML = features.map((feature, index) => `
                <label class="checkbox-item">
                    <input type="checkbox" name="wbs_feature" value="${feature}" ${index < 5 ? 'checked' : ''}>
                    <span class="checkmark"></span>
                    <span>${feature}</span>
                </label>
            `).join('');
        }
    });
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const projectType = projectTypeSelect?.value || 'commerce';
        const platform = platformSelect?.value || 'custom';
        const scale = scaleSelect?.value || 'medium';
        const selectedFeatures = Array.from(document.querySelectorAll('input[name="wbs_feature"]:checked')).map(cb => cb.value);
        
        // 기간 계산 (기능 수에 따라 동적 계산)
        const baseWeeks = {
            small: 2, medium: 8, large: 14, enterprise: 24
        };
        const totalWeeks = Math.round(baseWeeks[scale] * (1 + selectedFeatures.length * 0.05));
        
        // WBS 타이틀 업데이트
        const titleEl = resultCard?.querySelector('.card-title');
        if (titleEl) {
            titleEl.innerHTML = `<span class="ai-badge">AI</span> WBS - 총 ${totalWeeks}주`;
        }
        
        // 타임라인 업데이트
        updateWBSTimeline(resultCard, totalWeeks, projectType, platform);
        
        // 상세 업데이트
        updateWBSDetails(resultCard, totalWeeks, projectType, platform, selectedFeatures);
        
        // 분석 근거 업데이트
        const analysisEl = resultCard?.querySelector('.wbs-analysis p');
        if (analysisEl) {
            const typeName = projectTypeNames[projectType] || projectType;
            analysisEl.textContent = `유사 ${typeName} 프로젝트 ${Math.floor(Math.random() * 5) + 4}건의 평균 공수를 기반으로 산출되었습니다. (플랫폼: ${platform})`;
        }
        
        if (resultCard) {
            resultCard.style.animation = 'none';
            resultCard.offsetHeight;
            resultCard.style.animation = 'fadeIn 0.5s ease';
            
            // Animate timeline bars
            const bars = resultCard.querySelectorAll('.phase-bar');
            bars.forEach((bar, index) => {
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 0.8s ease';
                    bar.style.width = bar.dataset.width || bar.style.getPropertyValue('--width');
                }, index * 200);
            });
            
            // Animate phase details
            const details = resultCard.querySelectorAll('.wbs-phase-detail');
            details.forEach((detail, index) => {
                detail.style.opacity = '0';
                detail.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    detail.style.transition = 'all 0.4s ease';
                    detail.style.opacity = '1';
                    detail.style.transform = 'translateY(0)';
                }, 800 + index * 150);
            });
        }
    });
}

// WBS 타임라인 업데이트
function updateWBSTimeline(resultCard, totalWeeks, projectType, platform) {
    const timelineEl = resultCard?.querySelector('.wbs-timeline');
    if (!timelineEl) return;
    
    // 주 단위 라벨 생성
    let weekLabels = '';
    for (let i = 1; i <= totalWeeks; i++) {
        weekLabels += `<span>W${i}</span>`;
    }
    
    // 단계별 비율 계산
    const phases = [
        { name: '기획/디자인', ratio: 0.25, class: 'design' },
        { name: '퍼블리싱', ratio: 0.30, class: 'publishing' },
        { name: '개발', ratio: 0.30, class: 'development' },
        { name: '테스트/오픈', ratio: 0.15, class: 'testing' }
    ];
    
    let currentStart = 0;
    let phasesHTML = phases.map(phase => {
        const duration = Math.round(totalWeeks * 7 * phase.ratio);
        const width = phase.ratio * 100;
        const html = `
            <div class="timeline-phase">
                <div class="phase-info">
                    <span class="phase-name">${phase.name}</span>
                    <span class="phase-duration">${duration}일</span>
                </div>
                <div class="phase-bar-container">
                    <div class="phase-bar ${phase.class}" data-width="${width}%" style="--start: ${currentStart}%; --width: ${width}%"></div>
                </div>
            </div>
        `;
        currentStart += width;
        return html;
    }).join('');
    
    timelineEl.innerHTML = `
        <div class="timeline-header">
            <span class="phase-label">Phase</span>
            <div class="week-labels">${weekLabels}</div>
        </div>
        ${phasesHTML}
    `;
}

// WBS 상세 업데이트
function updateWBSDetails(resultCard, totalWeeks, projectType, platform, features) {
    const detailsEl = resultCard?.querySelector('.wbs-details');
    if (!detailsEl) return;
    
    // 기획/디자인 단계 태스크
    const designTasks = [
        { name: '요구사항 분석/정리', duration: Math.round(totalWeeks * 0.5) },
        { name: 'IA/화면설계(와이어프레임)', duration: Math.round(totalWeeks * 0.8) },
        { name: '디자인 시안 작업', duration: Math.round(totalWeeks * 1.2) },
        { name: '디자인 검수/수정', duration: Math.round(totalWeeks * 0.3) }
    ];
    
    // 퍼블리싱 단계 태스크
    const publishingTasks = [
        { name: '메인 페이지 퍼블리싱', duration: Math.round(totalWeeks * 0.5) },
        { name: '서브 페이지 퍼블리싱', duration: Math.round(totalWeeks * 1.0) },
        { name: '반응형/모바일 작업', duration: Math.round(totalWeeks * 0.6) },
        { name: '인터랙션/애니메이션', duration: Math.round(totalWeeks * 0.3) }
    ];
    
    // 개발 단계 태스크 (선택된 기능에 따라)
    const devTasks = [];
    if (features.includes('회원 기능')) devTasks.push({ name: '회원가입/로그인 개발', duration: Math.round(totalWeeks * 0.4) });
    if (features.includes('결제 기능') || features.includes('결제/구독')) devTasks.push({ name: '결제 시스템 연동', duration: Math.round(totalWeeks * 0.5) });
    if (features.includes('배송 기능')) devTasks.push({ name: '배송 관리 개발', duration: Math.round(totalWeeks * 0.3) });
    if (features.includes('장바구니')) devTasks.push({ name: '장바구니 개발', duration: Math.round(totalWeeks * 0.3) });
    if (features.includes('관리자 페이지')) devTasks.push({ name: '관리자 페이지 개발', duration: Math.round(totalWeeks * 0.5) });
    if (features.includes('예약 시스템')) devTasks.push({ name: '예약 시스템 개발', duration: Math.round(totalWeeks * 0.6) });
    if (features.includes('게시판')) devTasks.push({ name: '게시판 개발', duration: Math.round(totalWeeks * 0.3) });
    if (features.includes('검색')) devTasks.push({ name: '검색 기능 개발', duration: Math.round(totalWeeks * 0.3) });
    if (devTasks.length === 0) {
        devTasks.push({ name: `${platform} 연동 작업`, duration: Math.round(totalWeeks * 0.5) });
        devTasks.push({ name: '기타 기능 개발', duration: Math.round(totalWeeks * 0.5) });
    }
    
    // 테스트 단계 태스크
    const testTasks = [
        { name: '기능 테스트', duration: Math.round(totalWeeks * 0.4) },
        { name: '크로스브라우징 테스트', duration: Math.round(totalWeeks * 0.2) },
        { name: '버그 수정', duration: Math.round(totalWeeks * 0.3) },
        { name: '오픈 준비/배포', duration: Math.round(totalWeeks * 0.15) }
    ];
    
    const designWeeks = Math.ceil(totalWeeks * 0.25);
    const publishingWeeks = Math.ceil(totalWeeks * 0.30);
    const devWeeks = Math.ceil(totalWeeks * 0.30);
    const testWeeks = Math.ceil(totalWeeks * 0.15);
    
    detailsEl.innerHTML = `
        <div class="wbs-phase-detail">
            <div class="phase-header design">
                <span class="phase-icon">🎨</span>
                <span>Week 1-${designWeeks}: 기획/디자인</span>
            </div>
            <ul class="task-list">
                ${designTasks.map(t => `<li><span class="task-name">${t.name}</span><span class="task-duration">${t.duration}일</span></li>`).join('')}
            </ul>
        </div>
        
        <div class="wbs-phase-detail">
            <div class="phase-header publishing">
                <span class="phase-icon">💻</span>
                <span>Week ${designWeeks + 1}-${designWeeks + publishingWeeks}: 퍼블리싱</span>
            </div>
            <ul class="task-list">
                ${publishingTasks.map(t => `<li><span class="task-name">${t.name}</span><span class="task-duration">${t.duration}일</span></li>`).join('')}
            </ul>
        </div>
        
        <div class="wbs-phase-detail">
            <div class="phase-header development">
                <span class="phase-icon">⚙️</span>
                <span>Week ${designWeeks + publishingWeeks + 1}-${designWeeks + publishingWeeks + devWeeks}: 개발</span>
            </div>
            <ul class="task-list">
                ${devTasks.map(t => `<li><span class="task-name">${t.name}</span><span class="task-duration">${t.duration}일</span></li>`).join('')}
            </ul>
        </div>
        
        <div class="wbs-phase-detail">
            <div class="phase-header testing">
                <span class="phase-icon">✅</span>
                <span>Week ${designWeeks + publishingWeeks + devWeeks + 1}-${totalWeeks}: 테스트/오픈</span>
            </div>
            <ul class="task-list">
                ${testTasks.map(t => `<li><span class="task-name">${t.name}</span><span class="task-duration">${t.duration}일</span></li>`).join('')}
            </ul>
        </div>
    `;
    
    // 리스크 업데이트
    updateWBSRisks(resultCard, projectType, platform, features);
}

// WBS 리스크 업데이트
function updateWBSRisks(resultCard, projectType, platform, features) {
    const riskEl = resultCard?.querySelector('.wbs-risk .risk-items');
    if (!riskEl) return;
    
    const risks = [];
    
    // 플랫폼별 리스크
    if (platform === 'shopify' || platform === 'cafe24') {
        risks.push({
            name: `${platform} API 연동`,
            prob: '60%',
            desc: `과거 프로젝트: API 응답 지연 이슈 (평균 2-3일 지연)`,
            recommend: '권장: 버퍼 +1주'
        });
    }
    
    if (platform === 'custom' || platform === 'react' || platform === 'nextjs') {
        risks.push({
            name: '서버 환경 구축',
            prob: '40%',
            desc: '인프라 설정 및 배포 환경 구축 지연 가능성',
            recommend: '권장: 초기 환경 구축 선행'
        });
    }
    
    // 기능별 리스크
    if (features.includes('결제 기능') || features.includes('결제/구독')) {
        risks.push({
            name: 'PG사 심사 지연',
            prob: '50%',
            desc: 'PG사 심사 평균 소요: 5-10 영업일',
            recommend: '권장: 조기 심사 신청'
        });
    }
    
    if (features.includes('API 연동')) {
        risks.push({
            name: '외부 API 연동 이슈',
            prob: '55%',
            desc: '외부 API 문서 부족 또는 응답 지연',
            recommend: '권장: API 테스트 선행'
        });
    }
    
    // 공통 리스크
    risks.push({
        name: '고객사 피드백 지연',
        prob: '50%',
        desc: '평균 피드백 지연: 3일',
        recommend: '권장: 중간 검수 2회 이상'
    });
    
    riskEl.innerHTML = risks.slice(0, 3).map(risk => `
        <div class="risk-item">
            <div class="risk-header">
                <span class="risk-name">${risk.name}</span>
                <span class="risk-prob">확률 ${risk.prob}</span>
            </div>
            <p>${risk.desc}</p>
            <span class="risk-recommend">${risk.recommend}</span>
        </div>
    `).join('');
}

// ============================================
// Upload Page
// ============================================

function initUploadPage() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const uploadedFiles = document.getElementById('uploadedFiles');
    const winLossSelect = document.getElementById('winLossSelect');
    const winLossReasonGroup = document.getElementById('winLossReasonGroup');
    const submitBtn = document.getElementById('submitProject');
    
    // Browse button click
    browseBtn?.addEventListener('click', () => {
        fileInput?.click();
    });
    
    // File input change
    fileInput?.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    // Drag and drop
    dropzone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    
    dropzone?.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });
    
    dropzone?.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    
    dropzone?.addEventListener('click', () => {
        fileInput?.click();
    });
    
    // Win/Loss select change
    winLossSelect?.addEventListener('change', () => {
        if (winLossSelect.value === 'won' || winLossSelect.value === 'lost') {
            winLossReasonGroup.style.display = 'block';
        } else {
            winLossReasonGroup.style.display = 'none';
        }
    });
    
    // Submit project
    submitBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        showUploadSuccess();
    });
    
    // File category buttons
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Initialize tech stack tag input
    initTagInputFor('techStackInput', 'techStackTags');
    initTagInputFor('featureTagInput', 'featureTags');
    
    // File remove buttons
    document.querySelectorAll('.file-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const fileItem = btn.closest('.file-item');
            fileItem.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => fileItem.remove(), 300);
        });
    });
}

function handleFiles(files) {
    const uploadedFiles = document.getElementById('uploadedFiles');
    if (!uploadedFiles) return;
    
    Array.from(files).forEach(file => {
        const fileItem = createFileItem(file);
        uploadedFiles.insertBefore(fileItem, uploadedFiles.firstChild);
        simulateUpload(fileItem);
    });
}

function createFileItem(file) {
    const item = document.createElement('div');
    item.className = 'file-item uploading';
    
    const ext = file.name.split('.').pop().toLowerCase();
    let iconClass = 'docx';
    if (['pdf'].includes(ext)) iconClass = 'pdf';
    else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) iconClass = 'img';
    
    const fileType = getFileType(ext);
    
    item.innerHTML = `
        <div class="file-icon ${iconClass}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
            </svg>
        </div>
        <div class="file-info">
            <span class="file-name">${file.name}</span>
            <span class="file-meta">업로드 중... 0%</span>
            <div class="upload-progress">
                <div class="progress-bar" style="--progress: 0%"></div>
            </div>
        </div>
        <div class="file-status uploading">
            <div class="spinner"></div>
        </div>
        <button class="file-remove" title="취소">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    
    item.querySelector('.file-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        item.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => item.remove(), 300);
    });
    
    return item;
}

function getFileType(ext) {
    if (['pdf', 'pptx'].includes(ext)) return '제안서';
    if (['docx', 'hwp', 'xlsx'].includes(ext)) return '기획서';
    if (['jpg', 'jpeg', 'png', 'gif', 'psd'].includes(ext)) return '디자인';
    if (['js', 'py', 'html', 'css', 'php'].includes(ext)) return '코드';
    return '기타';
}

function simulateUpload(fileItem) {
    const progressBar = fileItem.querySelector('.progress-bar');
    const meta = fileItem.querySelector('.file-meta');
    const status = fileItem.querySelector('.file-status');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            fileItem.classList.remove('uploading');
            meta.textContent = `${(Math.random() * 5 + 0.5).toFixed(1)} MB · ${getFileType(fileItem.querySelector('.file-name').textContent.split('.').pop())}`;
            
            const progressContainer = fileItem.querySelector('.upload-progress');
            if (progressContainer) progressContainer.remove();
            
            status.classList.remove('uploading');
            status.classList.add('complete');
            status.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
        } else {
            meta.textContent = `업로드 중... ${Math.round(progress)}%`;
        }
        progressBar.style.setProperty('--progress', `${progress}%`);
    }, 200);
}

function showUploadSuccess() {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'upload-success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <h3>프로젝트가 등록되었습니다!</h3>
            <p>AI 학습이 시작됩니다. 완료까지 약 5-10분이 소요됩니다.</p>
            <button class="btn-primary" onclick="this.closest('.upload-success-modal').remove()">확인</button>
        </div>
    `;
    
    // Add modal styles inline
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 40px;
        text-align: center;
        max-width: 400px;
    `;
    
    const successIcon = modal.querySelector('.success-icon');
    successIcon.style.cssText = `
        width: 64px;
        height: 64px;
        background: rgba(46, 213, 115, 0.15);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        color: #2ED573;
    `;
    
    successIcon.querySelector('svg').style.cssText = `
        width: 32px;
        height: 32px;
    `;
    
    modal.querySelector('h3').style.cssText = `
        margin-bottom: 12px;
    `;
    
    modal.querySelector('p').style.cssText = `
        color: var(--text-secondary);
        margin-bottom: 24px;
    `;
    
    document.body.appendChild(modal);
}

function initTagInputFor(inputId, tagsContainerId) {
    const input = document.getElementById(inputId);
    const container = document.getElementById(tagsContainerId);
    if (!input || !container) return;
    
    let tags = [];
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = input.value.trim();
            if (value && !tags.includes(value)) {
                tags.push(value);
                renderTags();
                input.value = '';
            }
        }
    });
    
    // Suggested tags
    const suggestionContainer = input.closest('.tag-input-container');
    if (suggestionContainer) {
        suggestionContainer.querySelectorAll('.suggested-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const value = tag.getAttribute('data-tag');
                if (!tags.includes(value)) {
                    tags.push(value);
                    renderTags();
                }
            });
        });
    }
    
    function renderTags() {
        container.innerHTML = tags.map(tag => `
            <span class="selected-tag">
                ${tag}
                <button type="button" data-tag="${tag}">&times;</button>
            </span>
        `).join('');
        
        container.querySelectorAll('.selected-tag button').forEach(btn => {
            btn.addEventListener('click', () => {
                tags = tags.filter(t => t !== btn.getAttribute('data-tag'));
                renderTags();
            });
        });
    }
}

// ============================================
// Documents Page
// ============================================

function initDocumentsPage() {
    // Initialize filter search
    const filterInput = document.querySelector('.filter-input');
    filterInput?.addEventListener('input', debounce(() => {
        // Filter projects (demo)
        console.log('Filtering:', filterInput.value);
    }, 300));
    
    // Initialize project card actions
    document.querySelectorAll('.project-card-actions .btn-icon-small').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.project-card');
            const title = card.querySelector('.project-card-title').textContent;
            
            // Different actions based on button
            if (btn.title === '재학습') {
                showRelearningToast(title);
            } else if (btn.title === '학습 시작') {
                startLearning(card);
            }
        });
    });
    
    // Project card click
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            // Navigate to project detail (demo)
            console.log('Open project:', card.querySelector('.project-card-title').textContent);
        });
    });
}

function showRelearningToast(title) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span class="toast-icon">🔄</span>
        <span>"${title}" 재학습이 시작되었습니다.</span>
    `;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideUp 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function startLearning(card) {
    const status = card.querySelector('.project-card-status');
    const docsSection = card.querySelector('.project-card-docs');
    
    status.className = 'project-card-status learning';
    status.textContent = '학습 중';
    
    // Replace doc types with progress
    const docTypes = docsSection.querySelector('.doc-types');
    if (docTypes) {
        docTypes.outerHTML = `
            <div class="learning-progress">
                <div class="progress-track">
                    <div class="progress-fill" style="--progress: 0%"></div>
                </div>
                <span>0%</span>
            </div>
        `;
        
        // Animate progress
        const progressFill = docsSection.querySelector('.progress-fill');
        const progressText = docsSection.querySelector('.learning-progress span');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 10 + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                status.className = 'project-card-status learned';
                status.textContent = '학습 완료';
            }
            progressFill.style.setProperty('--progress', `${progress}%`);
            progressText.textContent = `${Math.round(progress)}%`;
        }, 500);
    }
    
    // Change button
    const startBtn = card.querySelector('.start-learning');
    if (startBtn) {
        startBtn.title = '재학습';
        startBtn.classList.remove('start-learning');
        startBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
        `;
    }
}

// ============================================
// Console Welcome Message
// ============================================

console.log(`
%c Agency Brain %c AI Knowledge Platform 
`, 
'background: linear-gradient(135deg, #00D9FF 0%, #7B61FF 100%); color: white; padding: 8px 16px; border-radius: 4px 0 0 4px; font-weight: bold;',
'background: #1a1a25; color: #a0a0b0; padding: 8px 16px; border-radius: 0 4px 4px 0;'
);
