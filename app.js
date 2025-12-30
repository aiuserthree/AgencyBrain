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
    
    // 제안서 생성 함수 - 실제 에이전시 제안서 구조 반영
    function generateProposal(data) {
        const { industry, industryName, target, platforms, budgetMin, budgetMax, features } = data;
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        
        // 예상 공수 및 견적 계산
        const featureCount = features.length || 5;
        const baseWeeks = Math.max(8, Math.ceil(featureCount * 1.2));
        const estimatedWeeks = baseWeeks + (platforms.length > 2 ? 3 : 0);
        const avgBudget = Math.round((parseInt(budgetMin) + parseInt(budgetMax)) / 2);
        
        // 팀 구성 계산
        const teamSize = {
            pm: 1,
            planner: 1,
            designer: Math.max(1, Math.ceil(featureCount / 6)),
            publisher: Math.max(1, Math.ceil(featureCount / 8)),
            frontDev: Math.max(1, Math.ceil(featureCount / 5)),
            backDev: Math.max(1, Math.ceil(featureCount / 6)),
            qa: 1
        };
        
        // 업종별 키워드 및 전략
        const industryStrategies = {
            fashion: { keyword: '스타일', value: '트렌드 선도', pain: '사이즈 불확실성', solution: 'AI 사이즈 추천' },
            beauty: { keyword: '아름다움', value: '맞춤형 뷰티', pain: '피부 타입 매칭', solution: 'AI 피부 진단' },
            fnb: { keyword: '맛', value: '신선함과 편리함', pain: '배송 신선도', solution: '실시간 배송 추적' },
            electronics: { keyword: '기술', value: '스마트 라이프', pain: '스펙 비교 어려움', solution: '스펙 비교 도구' },
            furniture: { keyword: '공간', value: '나만의 공간', pain: '배치 시뮬레이션', solution: 'AR 가구 배치' },
            healthcare: { keyword: '건강', value: '건강한 삶', pain: '예약 불편', solution: '스마트 예약 시스템' },
            education: { keyword: '성장', value: '평생 학습', pain: '학습 진도 관리', solution: 'AI 학습 분석' },
            finance: { keyword: '자산', value: '안전한 자산관리', pain: '복잡한 상품 비교', solution: 'AI 상품 추천' },
            travel: { keyword: '여행', value: '특별한 경험', pain: '일정 계획 어려움', solution: 'AI 여행 플래너' },
            default: { keyword: '혁신', value: '디지털 전환', pain: '사용성 개선', solution: '최적화된 UX' }
        };
        
        const strategy = industryStrategies[industry] || industryStrategies.default;
        
        // IA 구조 생성
        const generateIA = () => {
            const mainMenus = ['홈', '서비스 소개', '상품/서비스', '고객센터', '마이페이지'];
            return mainMenus.map((menu, i) => {
                const subMenus = features.slice(i * 2, i * 2 + 3).map(f => f) || ['메뉴1', '메뉴2'];
                return { main: menu, sub: subMenus.length > 0 ? subMenus : ['상세페이지'] };
            });
        };
        
        return `
            <!-- 표지 -->
            <div class="proposal-cover-page">
                <div class="cover-badge">PROPOSAL</div>
                <h1 class="cover-title">${industryName}<br>플랫폼 구축 제안서</h1>
                <div class="cover-subtitle">${target || '고객'} 대상 디지털 플랫폼 구축 프로젝트</div>
                <div class="cover-meta">
                    <div class="cover-date">${year}년 ${month}월</div>
                    <div class="cover-company">AGENCY BRAIN</div>
                </div>
            </div>
            
            <!-- 목차 -->
            <div class="proposal-section toc-section">
                <h2>📑 목차</h2>
                <div class="toc-list">
                    <div class="toc-item"><span class="toc-num">01</span><span class="toc-title">제안 개요</span></div>
                    <div class="toc-item"><span class="toc-num">02</span><span class="toc-title">프로젝트 이해</span></div>
                    <div class="toc-item"><span class="toc-num">03</span><span class="toc-title">전략 방향</span></div>
                    <div class="toc-item"><span class="toc-num">04</span><span class="toc-title">크리에이티브 컨셉</span></div>
                    <div class="toc-item"><span class="toc-num">05</span><span class="toc-title">사이트 구조 (IA)</span></div>
                    <div class="toc-item"><span class="toc-num">06</span><span class="toc-title">주요 기능 상세</span></div>
                    <div class="toc-item"><span class="toc-num">07</span><span class="toc-title">디자인 방향</span></div>
                    <div class="toc-item"><span class="toc-num">08</span><span class="toc-title">레퍼런스</span></div>
                    <div class="toc-item"><span class="toc-num">09</span><span class="toc-title">추진 일정</span></div>
                    <div class="toc-item"><span class="toc-num">10</span><span class="toc-title">투입 조직</span></div>
                    <div class="toc-item"><span class="toc-num">11</span><span class="toc-title">견적</span></div>
                    <div class="toc-item"><span class="toc-num">12</span><span class="toc-title">당사 역량</span></div>
                </div>
            </div>
            
            <!-- 01. 제안 개요 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">01</span>
                    <h2>제안 개요</h2>
                </div>
                <div class="overview-grid">
                    <div class="overview-item">
                        <div class="overview-label">프로젝트명</div>
                        <div class="overview-value">${industryName} 플랫폼 구축</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">사업 범위</div>
                        <div class="overview-value">UI/UX 기획, 디자인, 퍼블리싱, 개발</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">타겟 사용자</div>
                        <div class="overview-value">${target || '일반 사용자'}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">개발 환경</div>
                        <div class="overview-value">${platforms.length > 0 ? platforms.join(', ') : '협의 필요'}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">예상 기간</div>
                        <div class="overview-value">${estimatedWeeks}주 (약 ${Math.ceil(estimatedWeeks / 4)}개월)</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">예산 범위</div>
                        <div class="overview-value">${parseInt(budgetMin).toLocaleString()} ~ ${parseInt(budgetMax).toLocaleString()}만원</div>
                    </div>
                </div>
            </div>
            
            <!-- 02. 프로젝트 이해 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">02</span>
                    <h2>프로젝트 이해</h2>
                </div>
                
                <h3>프로젝트 배경</h3>
                <div class="insight-box">
                    <p>디지털 전환이 가속화되는 현 시점에서 ${industryName} 분야의 ${target || '고객'}들은 더욱 편리하고 개인화된 디지털 경험을 요구하고 있습니다. 기존 서비스의 한계를 극복하고, 차별화된 고객 경험을 제공하기 위한 새로운 플랫폼이 필요합니다.</p>
                </div>
                
                <h3>현황 분석</h3>
                <div class="analysis-grid">
                    <div class="analysis-card negative">
                        <div class="analysis-icon">😟</div>
                        <div class="analysis-title">Pain Point</div>
                        <ul class="analysis-list">
                            <li>${strategy.pain}</li>
                            <li>복잡한 사용자 여정</li>
                            <li>모바일 최적화 미흡</li>
                            <li>개인화 서비스 부재</li>
                        </ul>
                    </div>
                    <div class="analysis-card positive">
                        <div class="analysis-icon">🎯</div>
                        <div class="analysis-title">Opportunity</div>
                        <ul class="analysis-list">
                            <li>${strategy.solution} 도입</li>
                            <li>직관적 UX 설계</li>
                            <li>모바일 퍼스트 전략</li>
                            <li>AI 기반 개인화</li>
                        </ul>
                    </div>
                </div>
                
                <h3>목표</h3>
                <div class="goal-list">
                    <div class="goal-item">
                        <span class="goal-num">01</span>
                        <div class="goal-content">
                            <div class="goal-title">사용자 경험 혁신</div>
                            <div class="goal-desc">직관적인 UI/UX로 이탈률 30% 감소</div>
                        </div>
                    </div>
                    <div class="goal-item">
                        <span class="goal-num">02</span>
                        <div class="goal-content">
                            <div class="goal-title">비즈니스 성과 향상</div>
                            <div class="goal-desc">전환율 향상을 통한 매출 증대</div>
                        </div>
                    </div>
                    <div class="goal-item">
                        <span class="goal-num">03</span>
                        <div class="goal-content">
                            <div class="goal-title">브랜드 가치 제고</div>
                            <div class="goal-desc">프리미엄 브랜드 이미지 구축</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 03. 전략 방향 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">03</span>
                    <h2>전략 방향</h2>
                </div>
                
                <div class="strategy-main">
                    <div class="strategy-keyword">"${strategy.keyword}"</div>
                    <div class="strategy-slogan">${strategy.value}을 위한<br>디지털 경험 설계</div>
                </div>
                
                <div class="strategy-pillars">
                    <div class="pillar">
                        <div class="pillar-icon">🎯</div>
                        <div class="pillar-title">User-Centric</div>
                        <div class="pillar-desc">사용자 중심 설계로<br>최적의 경험 제공</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-icon">📱</div>
                        <div class="pillar-title">Mobile First</div>
                        <div class="pillar-desc">모바일 환경에<br>최적화된 UI/UX</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-icon">🤖</div>
                        <div class="pillar-title">AI & Data</div>
                        <div class="pillar-desc">데이터 기반<br>개인화 서비스</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-icon">⚡</div>
                        <div class="pillar-title">Performance</div>
                        <div class="pillar-desc">빠른 로딩 속도와<br>안정적인 서비스</div>
                    </div>
                </div>
            </div>
            
            <!-- 04. 크리에이티브 컨셉 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">04</span>
                    <h2>크리에이티브 컨셉</h2>
                </div>
                
                <div class="concept-main">
                    <div class="concept-title">CONCEPT</div>
                    <div class="concept-keyword">"Seamless ${strategy.keyword} Experience"</div>
                    <div class="concept-desc">끊김 없는 ${strategy.keyword} 경험으로 ${target || '고객'}의 일상에 자연스럽게 스며드는 플랫폼</div>
                </div>
                
                <div class="concept-elements">
                    <div class="concept-element">
                        <div class="element-title">톤 & 무드</div>
                        <div class="element-tags">
                            <span class="element-tag">Premium</span>
                            <span class="element-tag">Modern</span>
                            <span class="element-tag">Intuitive</span>
                        </div>
                    </div>
                    <div class="concept-element">
                        <div class="element-title">컬러 키워드</div>
                        <div class="color-palette">
                            <div class="color-chip" style="background: linear-gradient(135deg, #667eea, #764ba2)"></div>
                            <div class="color-chip" style="background: linear-gradient(135deg, #f093fb, #f5576c)"></div>
                            <div class="color-chip" style="background: linear-gradient(135deg, #4facfe, #00f2fe)"></div>
                            <div class="color-chip" style="background: #1a1a2e"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 05. 사이트 구조 (IA) -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">05</span>
                    <h2>사이트 구조 (IA)</h2>
                </div>
                
                <div class="ia-diagram">
                    <div class="ia-root">
                        <span>🏠 HOME</span>
                    </div>
                    <div class="ia-branches">
                        ${generateIA().map(menu => `
                            <div class="ia-branch">
                                <div class="ia-main">${menu.main}</div>
                                <div class="ia-subs">
                                    ${menu.sub.map(sub => `<div class="ia-sub">${sub}</div>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="ia-note">
                    <p>* 상세 IA는 킥오프 미팅 이후 요구사항 분석을 통해 확정됩니다.</p>
                </div>
            </div>
            
            <!-- 06. 주요 기능 상세 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">06</span>
                    <h2>주요 기능 상세</h2>
                </div>
                
                <div class="feature-detail-grid">
                    ${features.slice(0, 8).map((f, i) => `
                        <div class="feature-detail-card">
                            <div class="feature-detail-header">
                                <span class="feature-detail-icon">${getFeatureIcon(f)}</span>
                                <span class="feature-detail-num">F${String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div class="feature-detail-title">${f}</div>
                            <div class="feature-detail-desc">${getFeatureDescription(f)}</div>
                            <div class="feature-detail-points">
                                <span class="point">• 사용자 편의성 향상</span>
                                <span class="point">• 전환율 개선</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${features.length > 8 ? `
                <div class="more-features">
                    <h4>추가 기능</h4>
                    <div class="more-features-list">
                        ${features.slice(8).map(f => `<span class="more-feature-tag">${f}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
            
            <!-- 07. 디자인 방향 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">07</span>
                    <h2>디자인 방향</h2>
                </div>
                
                <div class="design-direction">
                    <div class="design-principle">
                        <div class="principle-num">01</div>
                        <div class="principle-content">
                            <div class="principle-title">미니멀 & 클린</div>
                            <div class="principle-desc">불필요한 요소를 제거하고 핵심 콘텐츠에 집중할 수 있는 깔끔한 디자인</div>
                        </div>
                    </div>
                    <div class="design-principle">
                        <div class="principle-num">02</div>
                        <div class="principle-content">
                            <div class="principle-title">일관된 디자인 시스템</div>
                            <div class="principle-desc">컴포넌트 기반 디자인 시스템으로 브랜드 일관성 유지 및 개발 효율성 향상</div>
                        </div>
                    </div>
                    <div class="design-principle">
                        <div class="principle-num">03</div>
                        <div class="principle-content">
                            <div class="principle-title">인터랙티브 요소</div>
                            <div class="principle-desc">적절한 마이크로 인터랙션으로 사용자 피드백 및 몰입감 제공</div>
                        </div>
                    </div>
                    <div class="design-principle">
                        <div class="principle-num">04</div>
                        <div class="principle-content">
                            <div class="principle-title">접근성 준수</div>
                            <div class="principle-desc">WCAG 2.1 가이드라인 준수로 모든 사용자를 위한 접근성 확보</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 08. 레퍼런스 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">08</span>
                    <h2>레퍼런스</h2>
                </div>
                
                <div class="reference-grid">
                    <div class="reference-card">
                        <div class="reference-image" style="background: linear-gradient(135deg, #667eea, #764ba2)">
                            <span>PROJECT A</span>
                        </div>
                        <div class="reference-info">
                            <div class="reference-title">${industryName} A사 플랫폼</div>
                            <div class="reference-meta">2024 | 웹/앱</div>
                            <div class="reference-tags">
                                <span>UI/UX</span>
                                <span>개발</span>
                            </div>
                        </div>
                    </div>
                    <div class="reference-card">
                        <div class="reference-image" style="background: linear-gradient(135deg, #f093fb, #f5576c)">
                            <span>PROJECT B</span>
                        </div>
                        <div class="reference-info">
                            <div class="reference-title">${industryName} B사 리뉴얼</div>
                            <div class="reference-meta">2024 | 반응형 웹</div>
                            <div class="reference-tags">
                                <span>리뉴얼</span>
                                <span>디자인</span>
                            </div>
                        </div>
                    </div>
                    <div class="reference-card">
                        <div class="reference-image" style="background: linear-gradient(135deg, #4facfe, #00f2fe)">
                            <span>PROJECT C</span>
                        </div>
                        <div class="reference-info">
                            <div class="reference-title">유사 업종 C사</div>
                            <div class="reference-meta">2023 | 커머스</div>
                            <div class="reference-tags">
                                <span>풀스택</span>
                                <span>커머스</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 09. 추진 일정 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">09</span>
                    <h2>추진 일정</h2>
                </div>
                
                <div class="schedule-summary">
                    <div class="schedule-total">
                        <span class="schedule-label">총 프로젝트 기간</span>
                        <span class="schedule-value">${estimatedWeeks}주 (약 ${Math.ceil(estimatedWeeks / 4)}개월)</span>
                    </div>
                </div>
                
                <div class="gantt-chart">
                    <div class="gantt-header">
                        <div class="gantt-phase-label">단계</div>
                        ${Array.from({length: Math.min(estimatedWeeks, 16)}, (_, i) => `<div class="gantt-week">${i + 1}W</div>`).join('')}
                    </div>
                    <div class="gantt-row">
                        <div class="gantt-phase-name">
                            <span class="phase-dot" style="background: #00D9FF"></span>
                            킥오프/분석
                        </div>
                        <div class="gantt-bar-area">
                            <div class="gantt-bar" style="width: ${Math.round(10/estimatedWeeks*100)}%; background: linear-gradient(90deg, #00D9FF, #00B4CC)"></div>
                        </div>
                    </div>
                    <div class="gantt-row">
                        <div class="gantt-phase-name">
                            <span class="phase-dot" style="background: #7B61FF"></span>
                            UX/UI 기획
                        </div>
                        <div class="gantt-bar-area">
                            <div class="gantt-bar" style="width: ${Math.round(15/estimatedWeeks*100)}%; margin-left: ${Math.round(8/estimatedWeeks*100)}%; background: linear-gradient(90deg, #7B61FF, #5B41DF)"></div>
                        </div>
                    </div>
                    <div class="gantt-row">
                        <div class="gantt-phase-name">
                            <span class="phase-dot" style="background: #FF6B9D"></span>
                            디자인
                        </div>
                        <div class="gantt-bar-area">
                            <div class="gantt-bar" style="width: ${Math.round(20/estimatedWeeks*100)}%; margin-left: ${Math.round(18/estimatedWeeks*100)}%; background: linear-gradient(90deg, #FF6B9D, #FF4B7D)"></div>
                        </div>
                    </div>
                    <div class="gantt-row">
                        <div class="gantt-phase-name">
                            <span class="phase-dot" style="background: #FFB347"></span>
                            퍼블리싱
                        </div>
                        <div class="gantt-bar-area">
                            <div class="gantt-bar" style="width: ${Math.round(20/estimatedWeeks*100)}%; margin-left: ${Math.round(30/estimatedWeeks*100)}%; background: linear-gradient(90deg, #FFB347, #FF8C00)"></div>
                        </div>
                    </div>
                    <div class="gantt-row">
                        <div class="gantt-phase-name">
                            <span class="phase-dot" style="background: #2ED573"></span>
                            개발
                        </div>
                        <div class="gantt-bar-area">
                            <div class="gantt-bar" style="width: ${Math.round(35/estimatedWeeks*100)}%; margin-left: ${Math.round(35/estimatedWeeks*100)}%; background: linear-gradient(90deg, #2ED573, #1EC05C)"></div>
                        </div>
                    </div>
                    <div class="gantt-row">
                        <div class="gantt-phase-name">
                            <span class="phase-dot" style="background: #5352ED"></span>
                            QA/테스트
                        </div>
                        <div class="gantt-bar-area">
                            <div class="gantt-bar" style="width: ${Math.round(15/estimatedWeeks*100)}%; margin-left: ${Math.round(70/estimatedWeeks*100)}%; background: linear-gradient(90deg, #5352ED, #3742fa)"></div>
                        </div>
                    </div>
                    <div class="gantt-row">
                        <div class="gantt-phase-name">
                            <span class="phase-dot" style="background: #FF4757"></span>
                            오픈/안정화
                        </div>
                        <div class="gantt-bar-area">
                            <div class="gantt-bar" style="width: ${Math.round(10/estimatedWeeks*100)}%; margin-left: ${Math.round(85/estimatedWeeks*100)}%; background: linear-gradient(90deg, #FF4757, #FF6B81)"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 10. 투입 조직 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">10</span>
                    <h2>투입 조직</h2>
                </div>
                
                <div class="org-chart">
                    <div class="org-pm">
                        <div class="org-card pm">
                            <div class="org-icon">👨‍💼</div>
                            <div class="org-role">PM</div>
                            <div class="org-count">${teamSize.pm}명</div>
                            <div class="org-desc">프로젝트 총괄</div>
                        </div>
                    </div>
                    <div class="org-teams">
                        <div class="org-card">
                            <div class="org-icon">📋</div>
                            <div class="org-role">기획</div>
                            <div class="org-count">${teamSize.planner}명</div>
                            <div class="org-desc">UX 설계, 화면 정의</div>
                        </div>
                        <div class="org-card">
                            <div class="org-icon">🎨</div>
                            <div class="org-role">디자인</div>
                            <div class="org-count">${teamSize.designer}명</div>
                            <div class="org-desc">UI 디자인, 그래픽</div>
                        </div>
                        <div class="org-card">
                            <div class="org-icon">🖥️</div>
                            <div class="org-role">퍼블리싱</div>
                            <div class="org-count">${teamSize.publisher}명</div>
                            <div class="org-desc">HTML/CSS, 반응형</div>
                        </div>
                        <div class="org-card">
                            <div class="org-icon">💻</div>
                            <div class="org-role">프론트엔드</div>
                            <div class="org-count">${teamSize.frontDev}명</div>
                            <div class="org-desc">클라이언트 개발</div>
                        </div>
                        <div class="org-card">
                            <div class="org-icon">⚙️</div>
                            <div class="org-role">백엔드</div>
                            <div class="org-count">${teamSize.backDev}명</div>
                            <div class="org-desc">서버, API, DB</div>
                        </div>
                        <div class="org-card">
                            <div class="org-icon">🔍</div>
                            <div class="org-role">QA</div>
                            <div class="org-count">${teamSize.qa}명</div>
                            <div class="org-desc">테스트, 품질관리</div>
                        </div>
                    </div>
                </div>
                
                <div class="team-total">
                    <span>총 투입 인력</span>
                    <span class="team-total-count">${Object.values(teamSize).reduce((a, b) => a + b, 0)}명</span>
                </div>
            </div>
            
            <!-- 11. 견적 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">11</span>
                    <h2>견적</h2>
                </div>
                
                <table class="estimate-table">
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>상세 내역</th>
                            <th>산출 근거</th>
                            <th>금액 (만원)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>기획</td>
                            <td>요구사항 분석, IA, 화면설계서, 기능정의서</td>
                            <td>기획자 ${teamSize.planner}명 × ${Math.ceil(estimatedWeeks * 0.3)}주</td>
                            <td class="amount">${Math.round(avgBudget * 0.12).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>디자인</td>
                            <td>UI 디자인, 디자인 시스템, 그래픽 에셋</td>
                            <td>디자이너 ${teamSize.designer}명 × ${Math.ceil(estimatedWeeks * 0.35)}주</td>
                            <td class="amount">${Math.round(avgBudget * 0.23).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>퍼블리싱</td>
                            <td>HTML/CSS, 반응형, 인터랙션</td>
                            <td>퍼블리셔 ${teamSize.publisher}명 × ${Math.ceil(estimatedWeeks * 0.3)}주</td>
                            <td class="amount">${Math.round(avgBudget * 0.15).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>프론트엔드</td>
                            <td>클라이언트 개발, API 연동</td>
                            <td>FE개발 ${teamSize.frontDev}명 × ${Math.ceil(estimatedWeeks * 0.5)}주</td>
                            <td class="amount">${Math.round(avgBudget * 0.22).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>백엔드</td>
                            <td>서버 개발, DB 설계, API 개발</td>
                            <td>BE개발 ${teamSize.backDev}명 × ${Math.ceil(estimatedWeeks * 0.5)}주</td>
                            <td class="amount">${Math.round(avgBudget * 0.20).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>QA/PM</td>
                            <td>품질관리, 테스트, 프로젝트 관리</td>
                            <td>QA ${teamSize.qa}명 + PM ${teamSize.pm}명</td>
                            <td class="amount">${Math.round(avgBudget * 0.08).toLocaleString()}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="total-label">합계 (VAT 별도)</td>
                            <td class="total-amount">${avgBudget.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>
                
                <div class="estimate-note">
                    <p>※ 본 견적은 제안 시점의 예상 견적이며, 상세 요구사항 확정 후 변동될 수 있습니다.</p>
                    <p>※ 서버 호스팅, 외부 API 라이선스 등 별도 비용은 포함되지 않았습니다.</p>
                </div>
            </div>
            
            <!-- 12. 당사 역량 -->
            <div class="proposal-section">
                <div class="section-header">
                    <span class="section-num">12</span>
                    <h2>당사 역량</h2>
                </div>
                
                <div class="company-intro">
                    <h3>Why Us?</h3>
                    <p>Agency Brain은 디지털 에이전시로서 다년간의 프로젝트 경험과 전문 인력을 바탕으로 최상의 결과물을 제공합니다.</p>
                </div>
                
                <div class="capability-grid">
                    <div class="capability-card">
                        <div class="capability-number">100+</div>
                        <div class="capability-label">프로젝트 수행</div>
                    </div>
                    <div class="capability-card">
                        <div class="capability-number">50+</div>
                        <div class="capability-label">전문 인력</div>
                    </div>
                    <div class="capability-card">
                        <div class="capability-number">95%</div>
                        <div class="capability-label">고객 만족도</div>
                    </div>
                    <div class="capability-card">
                        <div class="capability-number">10+</div>
                        <div class="capability-label">수상 경력</div>
                    </div>
                </div>
                
                <div class="why-us-list">
                    <div class="why-us-item">
                        <span class="why-us-icon">✓</span>
                        <div class="why-us-content">
                            <strong>${industryName} 분야 전문성</strong>
                            <p>다수의 ${industryName} 관련 프로젝트 수행 경험 보유</p>
                        </div>
                    </div>
                    <div class="why-us-item">
                        <span class="why-us-icon">✓</span>
                        <div class="why-us-content">
                            <strong>원스톱 서비스</strong>
                            <p>기획부터 디자인, 개발, 운영까지 전 과정 지원</p>
                        </div>
                    </div>
                    <div class="why-us-item">
                        <span class="why-us-icon">✓</span>
                        <div class="why-us-content">
                            <strong>애자일 방법론</strong>
                            <p>빠른 피드백과 유연한 대응으로 프로젝트 성공률 제고</p>
                        </div>
                    </div>
                    <div class="why-us-item">
                        <span class="why-us-icon">✓</span>
                        <div class="why-us-content">
                            <strong>사후 지원 체계</strong>
                            <p>오픈 후 3개월 무상 하자보수 및 운영 지원</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 마무리 -->
            <div class="proposal-ending">
                <div class="ending-message">
                    <h2>감사합니다</h2>
                    <p>본 제안서와 관련하여 궁금하신 사항이 있으시면<br>언제든지 문의해 주시기 바랍니다.</p>
                </div>
                <div class="contact-info">
                    <div class="contact-item">
                        <span class="contact-label">담당자</span>
                        <span class="contact-value">Agency Brain 영업팀</span>
                    </div>
                    <div class="contact-item">
                        <span class="contact-label">연락처</span>
                        <span class="contact-value">02-1234-5678</span>
                    </div>
                    <div class="contact-item">
                        <span class="contact-label">이메일</span>
                        <span class="contact-value">contact@agencybrain.com</span>
                    </div>
                </div>
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
        
        if (resultCard) {
            resultCard.style.animation = 'none';
            resultCard.offsetHeight;
            resultCard.style.animation = 'fadeIn 0.5s ease';
            
            const gaugeFill = resultCard.querySelector('.gauge-fill');
            const gaugeMarker = resultCard.querySelector('.gauge-marker');
            
            if (gaugeFill && gaugeMarker) {
                gaugeFill.style.transition = 'width 1s ease';
                gaugeMarker.style.transition = 'left 1s ease';
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

    // 업종별 IA 트리 데이터
    const iaTreeData = {
        fashion: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🛍️', label: '전체 상품', depth: 0, badge: 'depth 2' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '세일', depth: 1 },
            { icon: '👗', label: '카테고리', depth: 0, badge: 'depth 3' },
            { label: '아우터', depth: 1 },
            { label: '상의', depth: 1 },
            { label: '하의', depth: 1 },
            { label: '원피스', depth: 1 },
            { icon: '💡', label: '스타일링', depth: 0 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '위시리스트', depth: 1 },
            { label: '쿠폰/적립금', depth: 1 },
            { label: '배송지 관리', depth: 1 }
        ],
        beauty: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '✨', label: '전체 상품', depth: 0, badge: 'depth 2' },
            { label: '신상품', depth: 1 },
            { label: '베스트', depth: 1 },
            { label: '특가', depth: 1 },
            { icon: '💄', label: '카테고리', depth: 0, badge: 'depth 3' },
            { label: '스킨케어', depth: 1 },
            { label: '메이크업', depth: 1 },
            { label: '바디케어', depth: 1 },
            { label: '헤어케어', depth: 1 },
            { icon: '🔬', label: 'AI 피부진단', depth: 0 },
            { icon: '📦', label: '정기구독', depth: 0 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '💡', label: '뷰티팁', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '구독관리', depth: 1 },
            { label: '피부진단 기록', depth: 1 }
        ],
        fnb: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📋', label: '메뉴 소개', depth: 0, badge: 'depth 2' },
            { label: '시그니처', depth: 1 },
            { label: '커피', depth: 1 },
            { label: '음료', depth: 1 },
            { label: '디저트', depth: 1 },
            { icon: '📅', label: '예약하기', depth: 0 },
            { icon: '🛵', label: '주문하기', depth: 0, badge: 'depth 2' },
            { label: '배달주문', depth: 1 },
            { label: '포장주문', depth: 1 },
            { icon: '📍', label: '매장찾기', depth: 0 },
            { icon: '🎉', label: '이벤트', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '주문내역', depth: 1 },
            { label: '포인트', depth: 1 },
            { label: '리뷰', depth: 1 }
        ],
        healthcare: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🏥', label: '병원소개', depth: 0, badge: 'depth 2' },
            { label: '의료진 소개', depth: 1 },
            { label: '진료과목', depth: 1 },
            { label: '시설안내', depth: 1 },
            { icon: '📅', label: '진료예약', depth: 0, badge: 'depth 2' },
            { label: '온라인 예약', depth: 1 },
            { label: '예약 조회/변경', depth: 1 },
            { icon: '💊', label: '건강검진', depth: 0 },
            { icon: '📱', label: '비대면 진료', depth: 0 },
            { icon: '📋', label: '증명서 발급', depth: 0 },
            { icon: '📰', label: '건강정보', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '진료내역', depth: 1 },
            { label: '검사결과', depth: 1 },
            { label: '처방전', depth: 1 }
        ],
        education: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '📚', label: '강좌안내', depth: 0, badge: 'depth 3' },
            { label: '프로그래밍', depth: 1 },
            { label: '디자인', depth: 1 },
            { label: '비즈니스', depth: 1 },
            { label: '어학', depth: 1 },
            { icon: '🎓', label: '수강신청', depth: 0 },
            { icon: '💻', label: '내 강의실', depth: 0, badge: 'depth 2' },
            { label: '수강중인 강의', depth: 1 },
            { label: '과제 제출', depth: 1 },
            { label: '수료증', depth: 1 },
            { icon: '❓', label: '학습 Q&A', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '수강내역', depth: 1 },
            { label: '결제내역', depth: 1 },
            { label: '쿠폰함', depth: 1 }
        ],
        travel: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '✈️', label: '항공권', depth: 0 },
            { icon: '🏨', label: '숙소', depth: 0, badge: 'depth 2' },
            { label: '호텔', depth: 1 },
            { label: '펜션', depth: 1 },
            { label: '리조트', depth: 1 },
            { icon: '🎫', label: '패키지', depth: 0 },
            { icon: '🎟️', label: '투어/티켓', depth: 0 },
            { icon: '🚗', label: '렌터카', depth: 0 },
            { icon: '💡', label: '여행정보', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0, badge: 'depth 2' },
            { label: '예약내역', depth: 1 },
            { label: '마일리지', depth: 1 },
            { label: '리뷰', depth: 1 }
        ],
        public: [
            { icon: '🏠', label: '홈', depth: 0 },
            { icon: '🏛️', label: '기관소개', depth: 0, badge: 'depth 2' },
            { label: '인사말', depth: 1 },
            { label: '조직도', depth: 1 },
            { label: '찾아오시는 길', depth: 1 },
            { icon: '📝', label: '민원신청', depth: 0, badge: 'depth 2' },
            { label: '온라인 민원', depth: 1 },
            { label: '민원 조회', depth: 1 },
            { label: '증명서 발급', depth: 1 },
            { icon: '📰', label: '알림마당', depth: 0, badge: 'depth 2' },
            { label: '공지사항', depth: 1 },
            { label: '보도자료', depth: 1 },
            { icon: '📋', label: '정책정보', depth: 0 },
            { icon: '❓', label: '자주묻는질문', depth: 0 },
            { icon: '👤', label: '마이페이지', depth: 0 }
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
    
    // 사이트 유형 선택 시 주요 기능 업데이트
    siteTypeSelect?.addEventListener('change', updateIAFeatures);
    
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

    // 기능 유형별 상세 옵션 데이터
    const funcTypeOptions = {
        signup: ['소셜 로그인 포함', '본인인증 포함', '14세 미만 가입 제한', '이메일 인증', 'SMS 인증', '마케팅 수신 동의', '추천인 코드'],
        login: ['소셜 로그인', '자동 로그인', '생체인증', '2단계 인증', '비밀번호 찾기', '아이디 찾기', '로그인 기록 관리'],
        mypage: ['주문내역', '배송조회', '위시리스트', '쿠폰함', '적립금', '회원정보 수정', '배송지 관리', '리뷰 관리'],
        membership: ['회원등급제', '등급별 혜택', '승급 기준', 'VIP 전용관', '등급 유지 조건', '멤버십 카드'],
        withdrawal: ['탈퇴 사유 수집', '탈퇴 후 재가입 제한', '데이터 삭제 정책', '탈퇴 철회 기간'],
        product: ['상품 등록', '재고 관리', '옵션 관리', '상품 복사', '대량 등록', '상품 노출 설정', 'SEO 설정'],
        category: ['카테고리 계층 구조', '카테고리별 필터', '카테고리 정렬', '카테고리 이미지'],
        search: ['키워드 검색', '필터 검색', '자동완성', '인기 검색어', '최근 검색어', '연관 검색어', 'AI 추천'],
        cart: ['수량 변경', '옵션 변경', '품절 상품 알림', '장바구니 유효기간', '비회원 장바구니', '선물하기'],
        wishlist: ['폴더 분류', '재입고 알림', '가격 변동 알림', '공유 기능'],
        order: ['일반 주문', '바로 구매', '선물 주문', '해외 주문', '대량 주문', '비회원 주문'],
        payment: ['신용카드', '간편결제', '계좌이체', '가상계좌', '휴대폰 결제', '포인트 결제', '복합 결제', '해외 결제'],
        delivery: ['배송조회', '배송지 변경', '출고 전 취소', '예약 배송', '새벽 배송', '당일 배송', '해외 배송'],
        return: ['반품 신청', '교환 신청', '환불 처리', '반품 배송비', '불량품 처리', '부분 반품'],
        subscription: ['정기배송 주기', '구독 일시정지', '구독 해지', '구독 상품 변경', '다음 배송일 변경', '구독 혜택'],
        review: ['별점 평가', '텍스트 리뷰', '포토/동영상 리뷰', '리뷰 수정/삭제', '리뷰 신고', '베스트 리뷰', '리뷰 적립금'],
        qna: ['1:1 문의', '상품 Q&A', '답변 알림', '비밀글 설정', '파일 첨부', '문의 유형 분류'],
        board: ['글 작성/수정/삭제', '댓글', '좋아요', '파일 첨부', '공지 설정', '검색', '카테고리 분류'],
        chat: ['실시간 채팅', '채팅 상담', '챗봇', '파일 전송', '이미지 전송', '읽음 확인', '채팅 기록'],
        notification: ['앱 푸시', '이메일 알림', 'SMS 알림', '카카오 알림톡', '알림 설정', '알림 내역'],
        point: ['포인트 적립', '포인트 사용', '포인트 소멸', '적립 내역', '사용 내역', '등급별 적립률'],
        coupon: ['쿠폰 발급', '쿠폰 사용', '쿠폰 유형', '쿠폰 유효기간', '중복 사용', '최소 주문금액'],
        event: ['이벤트 등록', '참여 조건', '당첨자 발표', '경품 지급', '이벤트 알림'],
        referral: ['추천 코드 생성', '추천 혜택', '피추천인 혜택', '추천 내역'],
        booking: ['날짜/시간 선택', '인원 선택', '예약 확인', '예약 취소', '예약 변경', '노쇼 정책', '대기 예약'],
        schedule: ['캘린더 보기', '일정 등록', '일정 알림', '일정 공유', '반복 일정'],
        application: ['신청서 양식', '첨부파일', '신청 상태', '신청 내역', '승인/반려', '추가 정보 요청'],
        consultation: ['상담 유형', '희망 일시', '상담 내용', '상담사 배정', '상담 결과', '후속 상담'],
        admin_dashboard: ['주요 지표', '실시간 현황', '매출 통계', '회원 통계', '주문 통계', '알림'],
        admin_user: ['회원 목록', '회원 상세', '등급 변경', '포인트 지급', '휴면 처리', '탈퇴 처리'],
        admin_order: ['주문 목록', '주문 상세', '주문 상태 변경', '배송 처리', '취소/환불 처리', '일괄 처리'],
        admin_stats: ['매출 리포트', '상품 분석', '회원 분석', '기간별 비교', '엑셀 다운로드']
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

    // 기능 유형명
    const funcTypeNames = {
        signup: '회원가입', login: '로그인', mypage: '마이페이지', membership: '회원등급/멤버십',
        withdrawal: '회원탈퇴', product: '상품 관리', category: '카테고리 관리', search: '상품 검색',
        cart: '장바구니', wishlist: '위시리스트', order: '주문/구매', payment: '결제',
        delivery: '배송', return: '반품/교환', subscription: '정기구독', review: '리뷰/후기',
        qna: 'Q&A/문의', board: '게시판', chat: '실시간 채팅', notification: '알림/푸시',
        point: '포인트', coupon: '쿠폰', event: '이벤트/프로모션', referral: '친구추천',
        booking: '예약', schedule: '일정관리', application: '신청서/접수', consultation: '상담신청',
        admin_dashboard: '관리자 대시보드', admin_user: '회원 관리', admin_order: '주문 관리', admin_stats: '통계/리포트'
    };

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
        b2b: ['기업 인증', '대량 주문', '견적서', '세금계산서', '거래처 관리'],
        saas: ['팀 관리', 'API 연동', '사용량 분석', '권한 설정', '데이터 백업']
    };
    
    // 상세 옵션 업데이트 함수
    function updateFuncOptions() {
        const funcType = funcTypeSelect?.value || 'signup';
        const industry = funcIndustrySelect?.value || '';
        
        // 기본 옵션
        let options = funcTypeOptions[funcType] || funcTypeOptions['signup'];
        
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

    // 기능 유형 변경 시 옵션 업데이트
    funcTypeSelect?.addEventListener('change', updateFuncOptions);

    // 업종 변경 시 옵션 업데이트
    funcIndustrySelect?.addEventListener('change', updateFuncOptions);
    
    // 초기 옵션 생성
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
        if (funcResultContent && funcSpecContent[funcType]) {
            funcResultContent.innerHTML = funcSpecContent[funcType](industry, selectedOptions);
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
                <li><strong>2일 전~당일:</strong> 환불 불가</li>
                ${options.includes('노쇼 정책') ? `<li><strong>노쇼:</strong> 3회 노쇼 시 30일간 예약 제한</li>` : ''}
            </ul>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석</p>
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
