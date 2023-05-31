import "./TagsList.css";
import { Tag } from "../../atoms/Tag/Tag";
import { Button } from "../../atoms/Button/Button";
import { useState } from "react";

interface TagsListProps {
  tagType: string;
  tags?: string[];
  onClickFunction?: () => void;
}

export const TagsList = ({ tagType, tags,onClickFunction }: TagsListProps) => {

  const [tagsList, setTagsList] = useState<string[]>(tags ?? []);

  const handleTagRemove = (index: number) => {
    const newTagsList = [...tagsList!];
    newTagsList.splice(index, 1);
    setTagsList(newTagsList);
  };

  return (
    <div className="flex flex-row">
      {tagsList?.map((tagValue,index) => (
        <div  key={index}>
        <Tag tagType={tagType} tagValue={tagValue} onClick={onClickFunction}/>
        {tagType=="search" && (<Button size="tiny" label="x" onClick={()=> handleTagRemove(index)}/>)}
        </div>
      ))}
    </div>
  );
};
