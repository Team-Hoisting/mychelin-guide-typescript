import styled from 'styled-components';

interface EachCategoryBoxProps {
  readonly selected: boolean;
  readonly underlineOnHover: boolean;
  readonly changeOnHover: boolean;
}

interface CategoryNameProps {
  readonly selected: boolean;
}

interface CategoryIconProps {
  readonly width: string;
}

const EachCategoryBox = styled.div<EachCategoryBoxProps>`
  padding: 5px;
  text-align: center;
  cursor: pointer;
  transition: 0.1s ease-in;
  position: relative;

  ${({ selected }) => selected && `border-bottom: 2px solid var(--primary-color);`}

  ${({ underlineOnHover, selected }) =>
    underlineOnHover &&
    !selected &&
    `
        :hover {
          ${({ selected }: { selected: boolean }) =>
            !selected &&
            `
            transition: none;
            border-bottom: 2px solid #ababab;
          `}
        }
    `}

  ${({ changeOnHover }) =>
    changeOnHover &&
    `
        :hover > img {
          scale: 1.1;
          transition: 0.1s ease-in-out;
        }

        :hover > p {
          font-weight: 600;
          transition: 0.1s ease-in-out;
        }
    `};
`;

const CategoryIcon = styled.img<CategoryIconProps>`
  width: ${({ width }) => width && width};
  transition: 0.1s ease-in-out;
`;

const CategoryName = styled.p<CategoryNameProps>`
  margin: 0;
  font-weight: ${({ selected }) => selected && '600'};
`;

interface CategoryBoxProps {
  clickHandler: () => void;
  categoryImgFile: string;
  categoryName: string;
  selected: boolean;
  colored?: boolean;
  changeOnHover?: boolean;
  underlineOnHover?: boolean;
  iconWidth?: string;
}

const CategoryBox = ({
  clickHandler,
  categoryImgFile,
  categoryName,
  colored = false,
  selected,
  changeOnHover = true,
  underlineOnHover = true,
  iconWidth = '50%',
}: CategoryBoxProps) => {
  const imgSrc = `/categoryIcons/${colored ? '' : 'noColor/'}${categoryImgFile}.png`;

  return (
    <EachCategoryBox
      selected={selected}
      onClick={clickHandler}
      changeOnHover={changeOnHover}
      underlineOnHover={underlineOnHover}>
      <CategoryIcon src={imgSrc} alt={`${categoryName}`} width={iconWidth} />
      <CategoryName selected={selected}>{categoryName}</CategoryName>
    </EachCategoryBox>
  );
};

export default CategoryBox;
