import React from 'react';
import deburr from 'lodash/deburr';
import {TextField} from "@material-ui/core";
import useStyles from "./styles";
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';


export interface IAdminAutosuggestProps {
    value: string;
    onChange: (newValue: string) => void;
    focused: boolean;
    isValid: boolean;
    label: string;
    data: string[];
}

const renderInputComponent = (isValid: boolean, label: string, focused: boolean) => (inputProps: any) => {
    // const inputEl = React.useRef<HTMLInputElement>(null);
    //
    // const focus = () => {
    //     if (focused && inputEl && inputEl.current) {
    //         inputEl.current.focus();
    //     }
    // };
    //
    // React.useEffect(focus, []);

    return (
        <TextField
            autofocus={focused}
            required
            error={!isValid}
            label={label}
            // inputRef={inputEl}
            fullWidth
            {...inputProps}
        />
    );
};

const renderSuggestion = (suggestion: string, {query, isHighlighted}: Autosuggest.RenderSuggestionParams) => {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text} style={{fontWeight: part.highlight ? 550 : 400}}>{part.text}</span>
                ))}
            </div>
        </MenuItem>
    );
};

const AdminTextField = ({value, onChange, isValid, label, focused, data}: IAdminAutosuggestProps) => {
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const classes = useStyles();

    const getSuggestions = (input: string) => {
        const maxSuggestionsCount = 5;
        const inputValue = deburr(input.trim()).toLowerCase();
        return inputValue.length === 0 ? [] : data.filter(
            item => item.slice(0, inputValue.length).toLowerCase() === inputValue
        ).slice(0, maxSuggestionsCount);
    };

    const handleSuggestionsFetchRequested = ({value}: any) => {
        setSuggestions(getSuggestions(value));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = (event: React.ChangeEvent<{}>, {newValue}: Autosuggest.ChangeEvent) => onChange(newValue);

    const autosuggestProps = {
        renderInputComponent: renderInputComponent(isValid, label, focused),
        suggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue: (suggestion: string) => suggestion,
        renderSuggestion,
    };

    return (

        <div >
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    value,
                    onChange: handleChange,
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
        </div>
    );
};

export default AdminTextField;