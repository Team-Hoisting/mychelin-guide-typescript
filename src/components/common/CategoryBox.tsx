import styled from 'styled-components';

const EachCategoryBox = styled.div`
  padding: 5px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease-in;
  position: relative;

  ${({ selected }) =>
    selected &&
    `
      border-bottom: 2px solid var(--primary-color);
    `}

  ${({ underlineOnHover }) =>
    underlineOnHover &&
    `
        :hover {
          ${({ selected }) =>
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

const CategoryIcon = styled.img`
  width: ${({ width }) => width && width};
  transition: 0.1s ease-in-out;
`;

const CategoryName = styled.p`
  margin: 0;
  font-weight: ${({ selected }) => selected && '600'};
`;

/**
 *
 * @param {} Props: Required: { categoryImgFile, categoryName, colored }, Optional: { selected, clickHandler, changeOnHover }
 * @returns Component that contains the appropriate icon and name of the category
 */
const CategoryBox = ({
  clickHandler,
  categoryImgFile,
  categoryName,
  colored,
  selected,
  changeOnHover = true,
  underlineOnHover = true,
  iconWidth = '50%',
}) => {
  const imgSrc = `/categoryIcons/${colored ? '' : 'noColor/'}${categoryImgFile}.png`;

  return (
    <EachCategoryBox
      selected={selected}
      onClick={clickHandler}
      changeOnHover={changeOnHover}
      underlineOnHover={underlineOnHover}>
      {/* <SelectedIcon /> */}
      <CategoryIcon src={imgSrc} alt={`${categoryName}`} width={iconWidth} />
      <CategoryName selected={selected}>{categoryName}</CategoryName>
    </EachCategoryBox>
  );
};

export default CategoryBox;
