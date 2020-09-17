import React, { useState, useRef, useEffect } from 'react';
import './defaultStyles.css'

interface ICustomAutocompleteInput {
    suggestions: string[];
    placeholderValue?: string;
    exactMatch?: boolean;
    customClassName?: string;
}

const defaultPlaceholderValue: string = "";
const defaultCustomClassName: string = "";

const CustomAutocompleteInput: React.FC<ICustomAutocompleteInput> = ({
    suggestions,
    exactMatch = true,
    placeholderValue = defaultPlaceholderValue,
    customClassName = defaultCustomClassName
}) => {
    const [ inputValue, setInputValue ] = useState<string>("");
    const inputField = useRef<HTMLInputElement>(null);
    const suggestionWrapper = useRef<HTMLDivElement>(null);

    const setSuggestionWrapperVisibility = () => {
        // https://stackoverflow.com/questions/30619285/detect-whether-input-element-is-focused-within-reactjs
        if (inputField.current !== document.activeElement)
            // https://stackoverflow.com/questions/43951090/typescript-object-is-possibly-null
            suggestionWrapper.current!.style.display = 'none';
        else
            suggestionWrapper.current!.style.display = 'initial';
    }

    useEffect(() => {
        // Add event listener
        document.addEventListener('click', setSuggestionWrapperVisibility);

        // Remove event listener on cleanup
        return () => {
            document.removeEventListener('click', setSuggestionWrapperVisibility);
        };
    }, [])

    return (
        <div className={`customInputDeafultStyles ${customClassName}`} >
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                value={inputValue}
                placeholder={placeholderValue}
                ref={inputField}
            ></input>
            <div ref={suggestionWrapper} >
                {suggestions
                    .filter((x: string) => {
                        const exactMatching: boolean = x.toLowerCase().indexOf(inputValue.toLowerCase()) === 0 && inputValue !== "";
                        // if excact match is true, no partial matching is not allowed
                        const matching: boolean = exactMatch
                            ? false
                            : x.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 && inputValue !== "";

                        // dont show exact match (mainly after its selection)
                        const exists: boolean = x === inputValue;

                        return !exists && (exactMatching || matching);
                    })
                    .map((suggestion: string, i: number) => (
                        <div key={i} onClick={() => setInputValue(suggestion)}>{suggestion}</div>
                    ))}
            </div>
        </div>
    )
};

export default CustomAutocompleteInput;
export { CustomAutocompleteInput };
