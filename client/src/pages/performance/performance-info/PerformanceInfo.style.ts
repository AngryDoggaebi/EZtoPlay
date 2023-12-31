import { styled } from 'styled-components';
import { FontStyle } from '../../../utils/Theme';
import { DeviceQuery } from '../../../utils/Media';
import { screenScale } from '../../../utils/MediaSize';

export const ButtonHeadingContainer = styled.div`
  width: 360px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  & button {
    margin-top: 0px;
    &:first-of-type {
      margin-left: auto;
      margin-right: 8px;
    }
  }
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      margin-top: calc(20px * ${screenScale.tablet});
  `}
`;
export const Heading1 = styled.h1`
  margin-right: auto;
  color: white;
  ${FontStyle.heading1};
`;
export const Heading3 = styled.h3`
  margin-top: 20px;
  margin-bottom: 8px;
  margin-right: auto;
  margin-left: 15px;
  color: white;
  ${DeviceQuery.tablet`
      margin-bottom: calc(8px * ${screenScale.tablet});
      margin-top: calc(20px * ${screenScale.tablet});
      margin-left: calc(15px * ${screenScale.tablet});
  `}
  ${FontStyle.heading3};
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
`;
export const CategoryContainer = styled.div`
  margin-top: 20px;
  display: flex;
  min-width: 360px;
  justify-content: space-between;
  ${DeviceQuery.tablet`
      margin-top: calc(20px * ${screenScale.tablet});
      min-width: calc(360px * ${screenScale.tablet});
  `}
`;
export const SummaryContainer = styled.div`
  margin-top: 12px;
  width: 360px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${DeviceQuery.tablet`
       width: calc(360px * ${screenScale.tablet});
       margin-top: calc(12px * ${screenScale.tablet});
    `}
`;
export const Poster = styled.img`
  width: 170px;
  height: 210px;
  background-color: transparent;
  border-radius: 30px;
  object-fit: cover;
  &[src=''] {
    background-color: gray;
  }
  ${DeviceQuery.tablet`
       width: calc(170px * ${screenScale.tablet});
       height: calc(210px * ${screenScale.tablet});
    `}
`;
// align-items: flex-start 왼쪽 정렬, flex-end 오른쪽 정렬
export const Summary = styled.div`
  width: 170px;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  & p {
    color: white;
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
  }
  ${DeviceQuery.tablet`
      width: calc(170px * ${screenScale.tablet});
      height: calc(210px * ${screenScale.tablet});
  `}
`;
export const TextContainer = styled.div`
  width: 360px;
  color: white;
  font-size: var(--p-small-medium-font-size);
  font-weight: var(--p-small-medium-font-weight);
  line-height: var(--p-small-medium-line-height);
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
  `}
`;
export const Map = styled.div`
  width: 360px;
  height: 200px;
  background-color: gray;
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      height: calc(200px * ${screenScale.tablet});
  `}
`;
export const ReviewContainer = styled.div`
  width: 360px;
  & div {
    margin: 0px 0px 8px 0px;
  }
  margin-bottom: 12px;
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      margin-bottom: calc(12px * ${screenScale.tablet});
  `}
`;
export const BottomStickyContainer = styled.div`
  width: 390px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: auto;
  bottom: 70px;
  & button {
    z-index: 1;
  }
  ${DeviceQuery.tablet`
      width: calc(390px * ${screenScale.tablet});
      bottom: calc(70px * ${screenScale.tablet});
  `}
`;

export const EmptyWrapper = styled.div`
  width: 360px;
  height: 100px;
  background-color: var(--font-mid-color);
  border-radius: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;
  ${DeviceQuery.tablet`
      width: calc(360px * ${screenScale.tablet});
      height: calc(100px * ${screenScale.tablet});
      margin-bottom: calc(10px * ${screenScale.tablet});
   `}
`;
export const EmptyTitle = styled.p`
  ${FontStyle.smallRegular};
  color: var(--font-highlight-color);
  padding: 0px 15px 10px 15px;
  ${DeviceQuery.tablet`
      padding: calc(0px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet}) calc(10px * ${screenScale.tablet}) calc(15px * ${screenScale.tablet});
   `}
`;

// margin 되돌리기 용도
export const ReviewDiv = styled.div`
  margin-left: -15px;
  ${DeviceQuery.tablet`
    margin-left: calc(-15px * ${screenScale.tablet});
  `}
`;
