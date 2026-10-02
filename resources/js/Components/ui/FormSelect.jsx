import Select, { components } from "react-select";

import { FormField } from "./FormField";

const getSelectClassNames = (compact, boxed) => ({
    control: ({ isDisabled, menuIsOpen }) =>
        [
            "!min-h-12 w-full",
            compact ? "max-md:!min-h-10" : "",
            boxed ? "!bg-white !px-4" : "",
            "border-x-0 border-t-0 border-b border-b-gray-300",
            "rounded-none bg-white px-0",
            "font-secondary font-normal text-black",
            "shadow-none outline-none ring-0",
            "transition-colors duration-200",
            "hover:border-b-gray-300 hover:ring-0",
            menuIsOpen ? "!border-b-black" : "",
            isDisabled ? "cursor-default opacity-60" : "cursor-pointer",
        ]
            .filter(Boolean)
            .join(" "),

    valueContainer: () => "!p-0",

    placeholder: () =>
        "font-secondary text-gray-500/70",

    singleValue: () =>
        "font-secondary text-black",

    input: () =>
        "m-0 p-0 font-secondary text-black [&_input]:!outline-none [&_input]:!ring-0",

    indicatorSeparator: () => "hidden",

    dropdownIndicator: ({ isDisabled }) =>
        [
            "p-0 pl-3 text-black transition-opacity duration-200",
            isDisabled
                ? "cursor-default opacity-50"
                : "cursor-pointer hover:opacity-60",
        ].join(" "),

    menu: () =>
        "z-30 mt-2 overflow-hidden rounded-none border border-gray-200 bg-white shadow-lg",

    menuList: () => "p-0",

    option: ({ isFocused, isSelected }) =>
        [
            "cursor-pointer px-4 py-3",
            "font-secondary text-sm font-normal",
            "transition-colors duration-200",
            isSelected
                ? "bg-neutral-700/90 text-white"
                : isFocused
                  ? "bg-neutral-500/20 text-black"
                  : "bg-white text-black",
        ].join(" "),

    noOptionsMessage: () =>
        "px-4 py-3 font-secondary text-sm text-gray-500",
});

// Lenis só é bloqueado dentro da lista de opções, para o scroll da página
// continuar funcionando normalmente sobre o campo do select
const MenuList = (props) => (
    <components.MenuList
        {...props}
        innerProps={{ ...props.innerProps, "data-lenis-prevent": true }}
    />
);

export const FormSelect = ({
    id,
    name = id,
    label,
    options,
    value,
    errors,
    onChange,
    searchable = false,
    placeholder = "Selecione",
    disabled = false,
    compact = false,
    boxed = false,
}) => {
    const selectedOption =
        options.find((option) => option.value === value) ?? null;

    return (
        <FormField
            id={id}
            name={name}
            label={label}
            errors={errors}
        >
            <Select
                inputId={id}
                instanceId={id}
                name={name}
                options={options}
                value={selectedOption}
                onChange={(option) => {
                    onChange(name, option);
                }}
                placeholder={placeholder}
                classNames={getSelectClassNames(compact, boxed)}
                components={{ MenuList }}
                unstyled
                isSearchable={searchable}
                isDisabled={disabled}
                aria-invalid={Boolean(errors?.[name])}
                aria-describedby={
                    errors?.[name] ? `${id}-error` : undefined
                }
                noOptionsMessage={() => "Nenhuma opção encontrada"}
            />
        </FormField>
    );
};
