import "./TagsList.css";
import { Tag } from "../../atoms/Tag/Tag";
import { Button } from "../../atoms/Button/Button";

interface TagsListProps {
  tagType: string;
  tags?: string[];
}

export const TagsList = ({ tagType, tags }: TagsListProps) => {
  tags?.map((tag) => console.log(tag));
  return (
    <>
      {tags?.map((tagValue) => (
        <>
        <Tag tagType={tagType} tagValue={tagValue} />
        {tagType=="search"  && (<Button label={"x"} onClick={()=> console.log(tagValue)}/>)}
        </>
      ))}
    </>
  );
};
