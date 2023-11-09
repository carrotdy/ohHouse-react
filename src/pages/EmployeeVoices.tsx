import { useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { SubTitle, Title } from "../components/Common";
import { TeamCultureSlide } from "../constants/data/TeamCultureSlide";
import styled from "styled-components";

const EmployeeVoices = () => {
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
    <EmployeeVoicesContainer>
      <Title data-aos="fade-up" style={{ marginBottom: "20px" }}>
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
    </EmployeeVoicesContainer>
  );
};

const EmployeeVoicesContainer = styled.div`
  .slick-slider {
    height: 614px;
    width: 100%;

    .slick-list {
      .slick-track {
        display: flex;
        align-items: stretch;
        width: 400%;
        transition: transform 0.4s ease;

        .slick-slide {
          padding: 0;
          margin: 0 6px;
          width: calc(25% - 12px);

          img {
            width: 100%;
            height: auto;
          }

          div {
            text-align: center;
            font-size: 16px;
            margin-top: 12px;
          }
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1150px) {
    .slick-track {
      height: 640px;

      .slick-slide {
        width: calc(50% - 12px);
      }
    }
  }

  @media (min-width: 541px) and (max-width: 767px) {
    .slick-slider {
      height: 520px;
      .slick-list {
        .slick-track {
          .slick-slide {
            padding: 0px;

            .slick {
              padding: 0px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 540px) {
    .slick-slider {
      height: 592px;
      .slick-list {
        .slick-track {
          .slick-slide {
            padding: 0px;

            .slick {
              padding: 0px;
            }
          }
        }
      }
    }
  }
`;

export default EmployeeVoices;
