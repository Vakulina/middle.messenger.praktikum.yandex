import { Form } from "~src/components/form";
import { Input } from "~src/components/input";

type FormValidatorProps = {
  inputList: Input[],
  //TODO уточнить тип
  config: object,
  formElement: Form,
}
export class FormValidator {
  constructor({config, formElement, inputList}:FormValidatorProps) {

  _showInputError = (inputElement) => {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }
  _hideInputError = (inputElement) => {

    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _checkInputsValidity = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInputs() {
    return this._listInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _hasEmptyInput() {
    return this._listInputs.every(inputElement => {
      return inputElement.validity.length === 0;
    })
  }



  _toogleButtonsState() {

    if ((this._hasInvalidInputs()) || (this._hasEmptyInput())) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  resetValidation() {
    this._toogleButtonsState();
    this._listInputs.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toogleButtonsState();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._listInputs.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => {
        evt.preventDefault();
        this._checkInputsValidity(inputElement);
        this._toogleButtonsState();
      });
    });
  }
}
