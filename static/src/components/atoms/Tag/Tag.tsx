import "./Tag.css";

interface TagProps {
  tagType: string;
  tagValue: string;
}

export const Tag = ({ tagType, tagValue }: TagProps) => {
  return (
      <span className={`tag-${tagType}`}>{tagValue}</span>
  );
};
