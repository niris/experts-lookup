import "./Tag.css";

interface TagProps {
  tagType: string;
  tagValue: string;
  onClick?: () => void;
}

export const Tag = ({ tagType, tagValue, onClick}: TagProps) => {
  return (
      <span className={`tag-${tagType} rounded-full text-xs	` } onClick={onClick}>{tagValue}</span>
  );
};
