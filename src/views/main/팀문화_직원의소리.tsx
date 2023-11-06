import { useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { SubTitle, Title } from "../components/Common";
import { TeamCultureSlide } from "../constants/data/TeamCultureSlide";

const 팀문화_직원의소리 = () => {
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2200,
    responsive: [
      {
        breakpoint: 1151,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, []);

  return (
    <>
      <Title data-aos="fade-up" style={{ marginBottom: "30px" }}>
        오하우스에서 일 한다는 것
      </Title>
      <SubTitle data-aos="fade-up">
        오하우스는 더 많은 사람들의 삶을 더 낫게 만들기 위해 지속적으로 도전하며
        <br />
        혁신을 이뤄내는 최고의 팀이 되어야 한다고 믿습니다. 이를 위해
        <br />
        오하우스 다운 조직문화를 매 순간 고민하며 만들어가고 있습니다.
      </SubTitle>
      <Slider ref={sliderRef} {...settings}>
        {TeamCultureSlide.map((card) => {
          return (
            <div key={card.id} className="slick">
              <img src={card.image} />
              <div
                dangerouslySetInnerHTML={{
                  __html: card.title,
                }}
              />
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default 팀문화_직원의소리;
