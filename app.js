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
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const placeholder = resultCard.querySelector('.result-placeholder');
        const content = resultCard.querySelector('.result-content');
        
        placeholder.innerHTML = `
            <div class="placeholder-icon loading">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
            </div>
            <h3>AI 분석 중...</h3>
            <p>과거 프로젝트 데이터를 분석하고 있습니다.<br>잠시만 기다려주세요.</p>
        `;
        
        // Simulate AI processing
        setTimeout(() => {
            placeholder.style.display = 'none';
            content.style.display = 'block';
            content.style.animation = 'fadeIn 0.5s ease';
        }, 2000);
    });
}

// ============================================
// Estimate Form
// ============================================

function initEstimateForm() {
    const form = document.getElementById('estimateForm');
    const resultCard = document.getElementById('estimateResult');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add animation to result
        if (resultCard) {
            resultCard.style.animation = 'none';
            resultCard.offsetHeight; // Trigger reflow
            resultCard.style.animation = 'fadeIn 0.5s ease';
            
            // Animate gauge
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
        }
    }

    // 업종 선택 시 주요 기능 업데이트
    industrySelect?.addEventListener('change', updateIAFeatures);
    
    // 사이트 유형 선택 시 주요 기능 업데이트
    siteTypeSelect?.addEventListener('change', updateIAFeatures);
    
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

    // 기능 유형 변경 시 옵션 업데이트
    funcTypeSelect?.addEventListener('change', () => {
        const funcType = funcTypeSelect.value;
        const options = funcTypeOptions[funcType] || funcTypeOptions['signup'];
        
        if (funcOptionsContainer) {
            funcOptionsContainer.innerHTML = options.map((option, index) => `
                <label class="checkbox-item">
                    <input type="checkbox" name="func_option" value="${option}" ${index < 3 ? 'checked' : ''}>
                    <span class="checkmark"></span>
                    <span>${option}</span>
                </label>
            `).join('');
        }
    });

    // 업종에 따른 추가 옵션 변경
    funcIndustrySelect?.addEventListener('change', () => {
        const funcType = funcTypeSelect?.value;
        const industry = funcIndustrySelect.value;
        
        // 업종별 추가 옵션
        let additionalOptions = [];
        if (industry === 'beauty') {
            additionalOptions = ['피부 타입 선택', 'AI 맞춤 추천'];
        } else if (industry === 'fashion') {
            additionalOptions = ['사이즈 선택', '코디 추천'];
        } else if (industry === 'fnb') {
            additionalOptions = ['알레르기 정보', '영양 정보'];
        } else if (industry === 'healthcare') {
            additionalOptions = ['보험 연동', '의료 기록 연동'];
        } else if (industry === 'public') {
            additionalOptions = ['공인인증', '실명 인증'];
        }
        
        const baseOptions = funcTypeOptions[funcType] || funcTypeOptions['signup'];
        const allOptions = [...baseOptions, ...additionalOptions];
        
        if (funcOptionsContainer) {
            funcOptionsContainer.innerHTML = allOptions.map((option, index) => `
                <label class="checkbox-item">
                    <input type="checkbox" name="func_option" value="${option}" ${index < 3 ? 'checked' : ''}>
                    <span class="checkmark"></span>
                    <span>${option}</span>
                </label>
            `).join('');
        }
    });
    
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
    const hasSocialLogin = options.includes('소셜 로그인 포함');
    const hasIdentityVerify = options.includes('본인인증 포함');
    
    return `
        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">진입</span><p>회원가입 버튼 클릭</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">약관동의</span><p>필수/선택 약관 확인</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">정보입력</span><p>회원정보 입력</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">인증</span><p>본인인증/이메일인증</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">5</span><span class="step-title">완료</span><p>가입 완료 및 혜택 안내</p></div>
            </div>
        </div>
        <div class="func-section">
            <h4>1. 회원가입 방식</h4>
            <div class="func-table">
                <div class="func-row header"><span>항목</span><span>상세 내용</span><span>필수여부</span></div>
                <div class="func-row"><span>이메일 가입</span><span>이메일 주소를 아이디로 사용하여 직접 회원가입</span><span class="required">필수</span></div>
                ${hasSocialLogin ? `<div class="func-row"><span>소셜 로그인</span><span>카카오톡, 네이버, 구글, 애플 계정 연동 가입</span><span class="required">필수</span></div>` : ''}
                ${hasIdentityVerify ? `<div class="func-row"><span>본인인증</span><span>휴대폰 본인인증 (KG이니시스/나이스)</span><span class="optional">선택</span></div>` : ''}
            </div>
        </div>
        <div class="func-section">
            <h4>2. 필수 입력 정보</h4>
            <div class="func-table">
                <div class="func-row header"><span>필드명</span><span>유효성 검사 규칙</span><span>필수여부</span></div>
                <div class="func-row"><span>이메일(아이디)</span><span>이메일 형식 검사, 실시간 중복 확인</span><span class="required">필수</span></div>
                <div class="func-row"><span>비밀번호</span><span>8~20자, 영문+숫자+특수문자 2종 이상</span><span class="required">필수</span></div>
                <div class="func-row"><span>이름</span><span>2~20자, 한글/영문</span><span class="required">필수</span></div>
                <div class="func-row"><span>휴대폰</span><span>010 시작, 10~11자리, SMS 인증</span><span class="required">필수</span></div>
            </div>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석<br>
            <strong>법규 반영:</strong> 개인정보보호법, 정보통신망법 최신 기준 반영</p>
        </div>
    `;
}

// 로그인 기능정의서 생성
function generateLoginSpec(industry, options) {
    return `
        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">진입</span><p>로그인 페이지 접속</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">정보입력</span><p>아이디/비밀번호 입력</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">인증</span><p>로그인 검증</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">4</span><span class="step-title">완료</span><p>메인/이전 페이지 이동</p></div>
            </div>
        </div>
        <div class="func-section">
            <h4>1. 로그인 방식</h4>
            <div class="func-table">
                <div class="func-row header"><span>항목</span><span>상세 내용</span><span>필수여부</span></div>
                <div class="func-row"><span>일반 로그인</span><span>이메일 + 비밀번호 입력<br>• 아이디 저장 옵션<br>• 자동 로그인 옵션 (30일)</span><span class="required">필수</span></div>
                <div class="func-row"><span>소셜 로그인</span><span>카카오톡, 네이버, 구글, 애플<br>• 원클릭 로그인 지원</span><span class="required">필수</span></div>
                ${options.includes('생체인증') ? `<div class="func-row"><span>생체인증</span><span>지문/Face ID 인증 (앱 전용)</span><span class="optional">선택</span></div>` : ''}
                ${options.includes('2단계 인증') ? `<div class="func-row"><span>2단계 인증</span><span>OTP/SMS 추가 인증</span><span class="optional">선택</span></div>` : ''}
            </div>
        </div>
        <div class="func-section">
            <h4>2. 보안 정책</h4>
            <ul class="func-list">
                <li><strong>로그인 실패 제한:</strong> 5회 실패 시 10분간 로그인 차단</li>
                <li><strong>비밀번호 입력 마스킹:</strong> 입력 시 • 표시, 보기 토글 제공</li>
                <li><strong>세션 관리:</strong> 동시 로그인 3대 제한, 새 로그인 시 기존 세션 종료 선택</li>
                <li><strong>로그인 기록:</strong> IP, 기기, 시간 기록 및 이상 접속 알림</li>
            </ul>
        </div>
        <div class="func-section">
            <h4>3. 아이디/비밀번호 찾기</h4>
            <div class="func-table">
                <div class="func-row header"><span>기능</span><span>프로세스</span><span>인증방법</span></div>
                <div class="func-row"><span>아이디 찾기</span><span>1. 이름 + 휴대폰 입력<br>2. SMS 인증<br>3. 가입된 아이디 표시 (일부 마스킹)</span><span>SMS</span></div>
                <div class="func-row"><span>비밀번호 찾기</span><span>1. 아이디(이메일) 입력<br>2. 이메일 인증 링크 발송<br>3. 비밀번호 재설정 페이지 이동<br>4. 새 비밀번호 입력 및 완료</span><span>이메일</span></div>
            </div>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석<br>
            <strong>보안 기준:</strong> KISA 인터넷 보안 가이드라인 반영</p>
        </div>
    `;
}

// 결제 기능정의서 생성
function generatePaymentSpec(industry, options) {
    return `
        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">주문확인</span><p>상품/금액 확인</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">배송정보</span><p>배송지 입력/선택</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">할인적용</span><p>쿠폰/포인트 적용</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">결제수단</span><p>결제 방법 선택</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">5</span><span class="step-title">결제완료</span><p>주문 완료 안내</p></div>
            </div>
        </div>
        <div class="func-section">
            <h4>1. 결제 수단</h4>
            <div class="func-table">
                <div class="func-row header"><span>결제수단</span><span>상세 내용</span><span>수수료</span></div>
                ${options.includes('신용카드') ? `<div class="func-row"><span>신용/체크카드</span><span>국내 모든 카드사 지원, 할부 (2~12개월, 무이자 이벤트)</span><span>2.5~3.0%</span></div>` : ''}
                ${options.includes('간편결제') ? `<div class="func-row"><span>간편결제</span><span>네이버페이, 카카오페이, 토스페이, 페이코</span><span>3.0~3.5%</span></div>` : ''}
                ${options.includes('계좌이체') ? `<div class="func-row"><span>계좌이체</span><span>실시간 계좌이체 (모든 은행 지원)</span><span>1.5~2.0%</span></div>` : ''}
                ${options.includes('가상계좌') ? `<div class="func-row"><span>가상계좌</span><span>입금 기한 24시간, 미입금 시 자동 취소</span><span>300원/건</span></div>` : ''}
            </div>
        </div>
        <div class="func-section">
            <h4>2. 할인 적용</h4>
            <div class="func-table">
                <div class="func-row header"><span>할인유형</span><span>적용 규칙</span><span>중복여부</span></div>
                <div class="func-row"><span>쿠폰</span><span>정률/정액 할인, 최대 할인금액 제한, 최소 주문금액 조건</span><span>1장만</span></div>
                <div class="func-row"><span>적립금</span><span>1원 단위 사용, 최소 1,000원 이상 보유 시 사용 가능</span><span>가능</span></div>
                <div class="func-row"><span>등급 할인</span><span>회원 등급별 추가 할인율 적용</span><span>가능</span></div>
            </div>
        </div>
        <div class="func-section">
            <h4>3. 결제 프로세스</h4>
            <ul class="func-list">
                <li><strong>PG사 연동:</strong> KG이니시스/토스페이먼츠 연동 (이중화)</li>
                <li><strong>결제 검증:</strong> 주문금액과 실 결제금액 일치 검증</li>
                <li><strong>결제 실패:</strong> 실패 사유 안내, 재시도 버튼 제공</li>
                <li><strong>결제 완료:</strong> 주문번호 발급, 이메일/SMS 알림 발송</li>
            </ul>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석<br>
            <strong>PG사:</strong> 업종 특성 고려하여 최적 PG사 추천</p>
        </div>
    `;
}

// 장바구니 기능정의서 생성
function generateCartSpec(industry, options) {
    return `
        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">상품선택</span><p>상품 담기</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">장바구니</span><p>담긴 상품 확인</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">수량조절</span><p>수량/옵션 변경</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">4</span><span class="step-title">주문하기</span><p>결제 페이지 이동</p></div>
            </div>
        </div>
        <div class="func-section">
            <h4>1. 장바구니 기본 기능</h4>
            <div class="func-table">
                <div class="func-row header"><span>기능</span><span>상세 내용</span><span>필수여부</span></div>
                <div class="func-row"><span>상품 담기</span><span>상품 상세에서 옵션 선택 후 장바구니 담기<br>• 담기 완료 시 모달 or 플로팅 알림</span><span class="required">필수</span></div>
                <div class="func-row"><span>수량 변경</span><span>+/- 버튼 및 직접 입력<br>• 재고 초과 시 알림</span><span class="required">필수</span></div>
                <div class="func-row"><span>옵션 변경</span><span>장바구니에서 옵션 변경 가능<br>• 가격 차이 자동 반영</span><span class="optional">선택</span></div>
                <div class="func-row"><span>선택 삭제</span><span>개별/전체 선택 삭제<br>• 삭제 확인 팝업</span><span class="required">필수</span></div>
            </div>
        </div>
        <div class="func-section">
            <h4>2. 배송/결제 정보</h4>
            <ul class="func-list">
                <li><strong>배송비 계산:</strong> 무료배송 기준 금액 표시, 남은 금액 안내</li>
                <li><strong>예상 결제금액:</strong> 상품금액 + 배송비 - 할인 = 결제예정금액</li>
                <li><strong>재고 확인:</strong> 품절 상품 표시, 주문 불가 처리</li>
            </ul>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석<br>
            <strong>UX 최적화:</strong> 장바구니 이탈률 15% 감소 사례 기반</p>
        </div>
    `;
}

// 주문 기능정의서 생성
function generateOrderSpec(industry, options) {
    return `
        <div class="func-journey">
            <h4>📍 사용자 여정 (User Journey)</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">주문서작성</span><p>배송지/결제정보</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">결제</span><p>결제 진행</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">주문완료</span><p>주문번호 발급</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">배송</span><p>배송 진행</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">5</span><span class="step-title">수령완료</span><p>구매확정/리뷰</p></div>
            </div>
        </div>
        <div class="func-section">
            <h4>1. 주문 상태</h4>
            <div class="func-table">
                <div class="func-row header"><span>상태</span><span>설명</span><span>가능 액션</span></div>
                <div class="func-row"><span>주문완료</span><span>결제 완료 후 주문 접수 상태</span><span>주문취소</span></div>
                <div class="func-row"><span>상품준비중</span><span>판매자가 상품 준비 중</span><span>취소요청</span></div>
                <div class="func-row"><span>배송중</span><span>택배사 배송 진행 중</span><span>배송조회</span></div>
                <div class="func-row"><span>배송완료</span><span>배송 완료</span><span>구매확정, 교환/반품</span></div>
                <div class="func-row"><span>구매확정</span><span>구매 확정 (7일 자동 확정)</span><span>리뷰작성</span></div>
            </div>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석</p>
        </div>
    `;
}

// 배송 기능정의서 생성
function generateDeliverySpec(industry, options) {
    return `
        <div class="func-journey">
            <h4>📍 배송 프로세스</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">주문확인</span><p>주문 접수</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">상품준비</span><p>포장 진행</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">출고</span><p>택배사 전달</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">배송중</span><p>배송 진행</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">5</span><span class="step-title">배송완료</span><p>수령 완료</p></div>
            </div>
        </div>
        <div class="func-section">
            <h4>1. 배송 유형</h4>
            <div class="func-table">
                <div class="func-row header"><span>유형</span><span>조건</span><span>배송비</span></div>
                <div class="func-row"><span>일반배송</span><span>주문 후 2~3일 내 배송</span><span>3,000원 (5만원 이상 무료)</span></div>
                ${options.includes('당일 배송') ? `<div class="func-row"><span>당일배송</span><span>오전 11시 이전 주문 (권역 내)</span><span>5,000원</span></div>` : ''}
                ${options.includes('새벽 배송') ? `<div class="func-row"><span>새벽배송</span><span>밤 11시 이전 주문 시 익일 오전 7시 전 도착</span><span>3,000원</span></div>` : ''}
            </div>
        </div>
        <div class="func-section">
            <h4>2. 배송 조회</h4>
            <ul class="func-list">
                <li><strong>택배사 연동:</strong> CJ대한통운, 롯데택배, 한진 등 실시간 API 연동</li>
                <li><strong>배송 알림:</strong> 출고/배송중/배송완료 시 푸시/SMS 알림</li>
                <li><strong>배송지 변경:</strong> 출고 전 배송지 변경 가능</li>
            </ul>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석</p>
        </div>
    `;
}

// 리뷰 기능정의서 생성
function generateReviewSpec(industry, options) {
    return `
        <div class="func-journey">
            <h4>📍 리뷰 작성 여정</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">구매확정</span><p>상품 수령 확인</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">리뷰작성</span><p>별점/내용 입력</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">사진첨부</span><p>포토/동영상 등록</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">4</span><span class="step-title">적립금</span><p>리뷰 적립금 지급</p></div>
            </div>
        </div>
        <div class="func-section">
            <h4>1. 리뷰 유형별 적립금</h4>
            <div class="func-table">
                <div class="func-row header"><span>리뷰 유형</span><span>조건</span><span>적립금</span></div>
                <div class="func-row"><span>텍스트 리뷰</span><span>20자 이상 작성</span><span>100원</span></div>
                ${options.includes('포토/동영상 리뷰') ? `<div class="func-row"><span>포토 리뷰</span><span>사진 1장 이상 + 50자 이상</span><span>500원</span></div>` : ''}
                ${options.includes('포토/동영상 리뷰') ? `<div class="func-row"><span>동영상 리뷰</span><span>10초 이상 영상 + 50자 이상</span><span>1,000원</span></div>` : ''}
            </div>
        </div>
        <div class="func-section">
            <h4>2. 리뷰 정책</h4>
            <ul class="func-list">
                <li><strong>작성 기한:</strong> 구매확정 후 30일 이내</li>
                <li><strong>수정/삭제:</strong> 작성 후 7일 이내 1회 수정 가능</li>
                <li><strong>부적절 리뷰:</strong> 욕설, 광고, 허위 리뷰 신고 및 삭제</li>
                ${options.includes('베스트 리뷰') ? `<li><strong>베스트 리뷰:</strong> 주간 베스트 선정 시 추가 적립금 지급</li>` : ''}
            </ul>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석<br>
            <strong>전환율:</strong> 포토 리뷰 상품 구매전환율 평균 23% 상승</p>
        </div>
    `;
}

// 포인트 기능정의서 생성
function generatePointSpec(industry, options) {
    return `
        <div class="func-section">
            <h4>1. 포인트 적립 정책</h4>
            <div class="func-table">
                <div class="func-row header"><span>적립 사유</span><span>적립률/금액</span><span>조건</span></div>
                <div class="func-row"><span>구매 적립</span><span>결제금액의 1~3%</span><span>구매확정 시 자동 적립</span></div>
                <div class="func-row"><span>리뷰 적립</span><span>100~1,000원</span><span>리뷰 유형별 차등</span></div>
                <div class="func-row"><span>출석 체크</span><span>50~500원</span><span>매일 1회, 연속 보너스</span></div>
                <div class="func-row"><span>이벤트 적립</span><span>이벤트별 상이</span><span>이벤트 참여 시</span></div>
            </div>
        </div>
        <div class="func-section">
            <h4>2. 포인트 사용 정책</h4>
            <ul class="func-list">
                <li><strong>최소 보유:</strong> 1,000원 이상 보유 시 사용 가능</li>
                <li><strong>사용 단위:</strong> 100원 단위로 사용</li>
                <li><strong>최대 사용:</strong> 결제금액의 최대 30%까지 사용</li>
                <li><strong>유효기간:</strong> 적립일로부터 1년, 소멸 30일 전 알림</li>
            </ul>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석</p>
        </div>
    `;
}

// 쿠폰 기능정의서 생성
function generateCouponSpec(industry, options) {
    return `
        <div class="func-section">
            <h4>1. 쿠폰 유형</h4>
            <div class="func-table">
                <div class="func-row header"><span>유형</span><span>할인 방식</span><span>조건</span></div>
                <div class="func-row"><span>정액 할인</span><span>3,000원, 5,000원, 10,000원 등</span><span>최소 주문금액 조건</span></div>
                <div class="func-row"><span>정률 할인</span><span>5%, 10%, 15%, 20% 등</span><span>최대 할인금액 제한</span></div>
                <div class="func-row"><span>무료배송</span><span>배송비 0원</span><span>일반배송에만 적용</span></div>
                <div class="func-row"><span>품목 쿠폰</span><span>특정 카테고리/상품 전용</span><span>적용 상품 제한</span></div>
            </div>
        </div>
        <div class="func-section">
            <h4>2. 쿠폰 발급 방식</h4>
            <ul class="func-list">
                <li><strong>자동 발급:</strong> 회원가입, 생일, 휴면 복귀 시 자동 발급</li>
                <li><strong>수동 발급:</strong> 이벤트 페이지에서 다운로드</li>
                <li><strong>코드 발급:</strong> 쿠폰 코드 입력하여 등록</li>
            </ul>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석</p>
        </div>
    `;
}

// 예약 기능정의서 생성
function generateBookingSpec(industry, options) {
    return `
        <div class="func-journey">
            <h4>📍 예약 프로세스</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">날짜선택</span><p>희망 날짜 선택</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">시간선택</span><p>가능 시간대 선택</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">정보입력</span><p>예약자 정보 입력</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">결제</span><p>예약금/전액 결제</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">5</span><span class="step-title">예약확정</span><p>예약 완료 알림</p></div>
            </div>
        </div>
        <div class="func-section">
            <h4>1. 예약 기능</h4>
            <div class="func-table">
                <div class="func-row header"><span>기능</span><span>상세 내용</span><span>필수여부</span></div>
                <div class="func-row"><span>캘린더 뷰</span><span>월별 캘린더에서 예약 가능일 표시</span><span class="required">필수</span></div>
                <div class="func-row"><span>시간대 선택</span><span>30분/1시간 단위 시간 슬롯</span><span class="required">필수</span></div>
                ${options.includes('인원 선택') ? `<div class="func-row"><span>인원 선택</span><span>예약 인원수 선택</span><span class="required">필수</span></div>` : ''}
                ${options.includes('대기 예약') ? `<div class="func-row"><span>대기 예약</span><span>마감 시 대기 등록, 취소 시 알림</span><span class="optional">선택</span></div>` : ''}
            </div>
        </div>
        <div class="func-section">
            <h4>2. 취소/환불 정책</h4>
            <ul class="func-list">
                <li><strong>7일 전:</strong> 100% 환불</li>
                <li><strong>3~6일 전:</strong> 50% 환불</li>
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
    return `
        <div class="func-journey">
            <h4>📍 구독 여정</h4>
            <div class="journey-flow">
                <div class="journey-step"><span class="step-num">1</span><span class="step-title">상품선택</span><p>구독 상품 선택</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">2</span><span class="step-title">주기설정</span><p>배송 주기 선택</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">3</span><span class="step-title">결제등록</span><p>정기결제 수단 등록</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step"><span class="step-num">4</span><span class="step-title">구독시작</span><p>첫 배송 진행</p></div>
                <div class="journey-arrow">→</div>
                <div class="journey-step completed"><span class="step-num">5</span><span class="step-title">정기배송</span><p>주기별 자동 배송</p></div>
            </div>
        </div>
        <div class="func-section">
            <h4>1. 구독 관리 기능</h4>
            <div class="func-table">
                <div class="func-row header"><span>기능</span><span>상세 내용</span><span>필수여부</span></div>
                <div class="func-row"><span>배송 주기</span><span>1주/2주/3주/4주/6주/8주 선택</span><span class="required">필수</span></div>
                ${options.includes('구독 일시정지') ? `<div class="func-row"><span>일시정지</span><span>최대 2개월까지 일시정지</span><span class="optional">선택</span></div>` : ''}
                ${options.includes('구독 상품 변경') ? `<div class="func-row"><span>상품 변경</span><span>다음 회차부터 상품/수량 변경</span><span class="optional">선택</span></div>` : ''}
                ${options.includes('다음 배송일 변경') ? `<div class="func-row"><span>배송일 변경</span><span>다음 배송일 앞당기기/미루기</span><span class="optional">선택</span></div>` : ''}
            </div>
        </div>
        <div class="func-section">
            <h4>2. 구독 혜택</h4>
            <ul class="func-list">
                <li><strong>할인:</strong> 정기구독 상품 5~15% 할인</li>
                <li><strong>배송비:</strong> 구독 상품 배송비 무료</li>
                <li><strong>적립:</strong> 구독 회차별 추가 적립금 지급</li>
            </ul>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석<br>
            <strong>구독 유지율:</strong> 평균 6개월 이상 유지율 65%</p>
        </div>
    `;
}

// 마이페이지 기능정의서 생성
function generateMypageSpec(industry, options) {
    return `
        <div class="func-section">
            <h4>1. 마이페이지 메뉴 구성</h4>
            <div class="func-table">
                <div class="func-row header"><span>메뉴</span><span>기능</span><span>필수여부</span></div>
                ${options.includes('주문내역') ? `<div class="func-row"><span>주문내역</span><span>주문 목록, 상세, 배송조회, 취소/반품</span><span class="required">필수</span></div>` : ''}
                ${options.includes('위시리스트') ? `<div class="func-row"><span>위시리스트</span><span>찜한 상품 목록, 장바구니 담기</span><span class="optional">선택</span></div>` : ''}
                ${options.includes('쿠폰함') ? `<div class="func-row"><span>쿠폰함</span><span>보유 쿠폰, 사용 내역, 다운로드</span><span class="optional">선택</span></div>` : ''}
                ${options.includes('적립금') ? `<div class="func-row"><span>적립금</span><span>보유 적립금, 적립/사용 내역</span><span class="optional">선택</span></div>` : ''}
                ${options.includes('회원정보 수정') ? `<div class="func-row"><span>회원정보 수정</span><span>기본정보, 비밀번호 변경</span><span class="required">필수</span></div>` : ''}
                ${options.includes('배송지 관리') ? `<div class="func-row"><span>배송지 관리</span><span>배송지 추가/수정/삭제, 기본 배송지</span><span class="optional">선택</span></div>` : ''}
            </div>
        </div>
        <div class="func-section">
            <h4>2. 회원 등급 정보</h4>
            <ul class="func-list">
                <li><strong>등급 표시:</strong> 현재 등급, 다음 등급까지 남은 금액</li>
                <li><strong>등급 혜택:</strong> 등급별 할인율, 적립률, 쿠폰 안내</li>
                <li><strong>구매 현황:</strong> 당월/연간 구매금액 표시</li>
            </ul>
        </div>
        <div class="func-analysis">
            <h4>📊 분석 근거</h4>
            <p><strong>분석 대상:</strong> 유사 ${industry} 프로젝트 ${Math.floor(Math.random() * 5) + 5}건 분석</p>
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
