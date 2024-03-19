// import './styles.css';
import style from "./styles.module.css";


const CodingLeftComponent = () => {

    return (
        <>
            <div className="w-[29%] h-[95%] rounded-2xl bg-[#fff]">
                <div className="w-[95%] h-[4rem] flex justify-center">
                    <div className="w-[90%] h-[100%] border-b-[1px] border-[#EBEBEB] flex items-center">
                        <span className="bg-[#F5F5F5] py-1 px-3 rounded-2xl text-sm font-semibold text-[#4A525D]">Problem</span>
                    </div>
                </div>

                <div className="w-[95%] h-[80%] flex justify-center gap-[1rem] mt-[1rem]">
                    <div className="w-[90%] h-[100%] border-b-[1px] flex flex-col gap-[1rem]  ">
                        <div className="flex gap-2 items-center">
                            <h2 className="text-xl font-semibold font-sans">
                                Group Anagrams
                            </h2>
                            <span className="bg-[#F0F3FF] py-1 px-3 rounded-2xl text-[#6137DB] text-sm font-semibold ">
                                Easy
                            </span>
                        </div>
                        <p>
                            Given an array of strings strs, group the anagrams
                            together. You can return the answer in any order.
                            An Anagram is a word or phrase formed by rearranging the
                            letters of a different word or phrase, typically using all the original letters exactly once.
                        </p>

                        <h3 className="text-xl font-semibold font-sans">Example:</h3>
                        <ul>
                            <li className="flex  items-center gap-3 text-[#ACA7BA]">
                                Input <span className="py-2 text-black border-[#D3CFFC] rounded-md bg-[#F0F3FF] px-2 border-[1px] ">strs = ["eat","tea","tan","ate","nat","bat"]</span>
                            </li>
                        </ul>
                        <ul>
                            <li className="flex  items-center gap-3 text-[#ACA7BA]">
                                Output <span className="py-2 text-black border-[#D3CFFC] rounded-md bg-[#F0F3FF] px-2 border-[1px] ">["eat","tea","tan","ate","nat","bat"]</span>
                            </li>
                        </ul>


                        <h3 className="text-xl font-semibold font-sans">Constraints:</h3>
                        <ul>
                            <li className="flex  items-center gap-3 text-[#ACA7BA]">
                                *<span className="py-2 text-black border-[#D3CFFC] rounded-md bg-[#F0F3FF] px-2 border-[1px] ">{`1 <= strs.length <= 104`}</span>
                            </li>
                        </ul>
                        <ul>
                            <li className="flex  items-center gap-3 text-[#ACA7BA]">
                                * <span className="py-2 text-black border-[#D3CFFC] rounded-md bg-[#F0F3FF] px-2 border-[1px] ">{`0 <= strs[i].length <= 100`}</span>
                            </li>
                        </ul>
                        <ul>
                            <li className="flex  items-center gap-3 text-[#ACA7BA]">
                                * <span className="py-2 text-black border-[#D3CFFC] rounded-md bg-[#F0F3FF] px-2 border-[1px] ">{`strs[i]`}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CodingLeftComponent