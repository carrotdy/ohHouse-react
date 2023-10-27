import { CommunityPNG, IntroContentsPNG, ServicePNG, StorePNG } from "../../images/png";
import { CompanyModel } from "../../model/CompanyModel";

const IntroduceCompany: Array<CompanyModel.ICompanyModel> = [
    {
        index: 0,
        title: `공간을 꾸미는 유저들의 사례가\n가득한 콘텐츠`,
        description: '온라인 집들이와 인테리어 노하우 등 다양한 인테리어 콘텐츠들을\n제공하여 누구나 쉽게 재미있게 공간을 변화시킬 수 있도록 돕습니다.',
        image: IntroContentsPNG,
    },
    {
        index: 0,
        title: '매력적인 콘텐츠를 끊임없이\n공유하는 커뮤니티',
        description: '자신의 공간을 사랑하는 유저들이 서로의 공간을 공유하고 공감하며\n진정성이 담긴 콘텐츠를 지속적으로 나눕니다.',
        image: CommunityPNG,
    },
    {
        index: 1,
        title: '제품 탐색부터 구매까지\nOne-stop으로 가능한 스토어',
        description: '콘텐츠 속 제품 정보가 궁금할 때 태그를 클릭하여 상세 정보를 확인하고,\n구매까지 한 번에 진행할 수 있도록 편리한 구매 경험을 제공합니다.',
        image: StorePNG,
    },
    {
        index: 2,
        title: '더 쉽고, 편리하며, 믿을 수 있는\n인테리어 시공, 이사, 이사청소, 수리 서비스',
        description: '어렵게만 느껴졌던 시공도 오늘의집에서는 쉬워집니다.\n어디서부터 시작해야 할 지 몰랐던 이사 준비도 오늘의집에서 시작하세요.\n맞춤업체 찾기, 예상 견적 산출, 믿을만한 시공과 이사까지\n오늘의집에서 원스톱으로 진행할 수 있습니다.',
        image: ServicePNG,
    },
]

export default IntroduceCompany