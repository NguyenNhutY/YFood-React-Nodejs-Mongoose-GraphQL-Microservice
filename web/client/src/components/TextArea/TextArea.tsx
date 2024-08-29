import React from "react";

interface TextAreaProps {
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => (
    <textarea
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
      onKeyDown={props.onKeyDown}
      onFocus={props.onFocus}
      ref={ref}
    />
  )
);

TextArea.displayName = "TextArea";
export default TextArea;
