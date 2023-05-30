import { Input } from "../../atoms/Input/Input";
import {TagsList} from "../TagsList/TagsList";

interface SearchProps{
  skills: string[];
  

}
const SearchArea = () => {
  return (
    <>
      <Input inputType="search" isEditable onChange={() => {}} />
      <Input inputType="submit" onChange={() => {}} />
      <TagsList tagType="search" tags={["Hello","World"]} />
    </>
  );
};

export default SearchArea;
