import React from 'react';

export const InputText = ({ labelText, inputType, inputId, inputName, onChange, className, placeHolder, inputValue, defaultValue, inputDisable, maxLength }) => {

    return (
        <div className="form-group">
            <label className="form-label">{labelText}</label>
            <input onChange={onChange} type={inputType} name={inputName} disabled={inputDisable} value={inputValue} defaultValue={defaultValue} placeholder={placeHolder} id={inputId} className={"form-control" + " " + className} maxLength={maxLength} />
        </div>
    )
}


export const Checkbox = ({ labelText, inputId, inputName, className, onChange, inputValue, checkBoxChecked }) => {
    return (
        <div className="form-group">
            <input type="checkbox" name={inputName} onChange={onChange} id={inputId} className={"custom-checkbox" + " " + className} value={inputValue} checked={checkBoxChecked} />
            <label for={inputId} className="form-label">{labelText}</label>
        </div>
    )
}


export const StatusCheckbox = ({ labelText, inputId, inputName, className, onClick, inputValue }) => {
    return (
        <div className="form-group StatusCheckbox">
            <input type="checkbox" name={inputName} id={inputId} className={"custom-checkbox" + " " + className} onClick={onClick} value={inputValue} />
            <label for={inputId} className="form-label">{labelText}</label>
        </div>
    )
}


export const TextArea = ({ labelText, inputId, rowSize }) => {
    return (
        <div className="form-group">
            <label for={inputId} className="form-label">{labelText}</label>
            <textarea className="form-control" id={inputId} rows={rowSize}></textarea>
        </div>
    )
}



export const Selectbox = ({ labelText, inputId, inputName }) => {
    return (
        <div className="form-group">
            <label className="form-label">{labelText}</label>
            <select className="form-select" name={inputName} id={inputId}>
                <option value="en" text="fgf">English</option>
                <option value="ko" text="fgf">Korean</option>
                <option value="fr" text="fgf">French</option>
            </select>
        </div>
    )
}

export const SelectStatus = ({ inputId, inputName }) => {
    return (
        <div className="form-group">
            <select className="form-select" name={inputName} id={inputId}>
                <option value="en" text="fgf">Filter By Status</option>
                <option value="en" text="fgf">Active</option>
                <option value="ko" text="fgf">Pending</option>
                <option value="fr" text="fgf">Closed</option>
            </select>
        </div>
    )
}


export const SelectGender = ({ inputId, inputName, labelText, className, onChange }) => {
    return (
        <div className="form-group">
            <label className="form-label">{labelText}</label>

            <select className={"form-select" + " " + className} name={inputName} id={inputId} onChange={onChange}>
                <option style={{ "display": "none" }}>select Gender</option>
                <option value="Male" text="fgf">Male</option>
                <option value="Female" text="fgf">Female</option>
            </select>
        </div>
    )
}


export const Radio = ({ inputId, inputName, labelText, inputValue, radioChecked, onChange, className, radioDisable }) => {
    return (
        <div class="form-check form-check-inline">
            <input className={"form-check-input" + " " + className} type="radio" name={inputName} id={inputId} value={inputValue} checked={radioChecked} onChange={onChange} disabled={radioDisable} />
            <label for={inputId} class="form-check-label">{labelText}</label>
        </div>
    )
}



