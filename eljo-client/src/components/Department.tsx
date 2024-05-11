import { Select, SelectProps } from '@mantine/core'
interface Props extends Omit<SelectProps, 'value'|'onChange'>{
    value?: string,
    onChange: (value: string) => void,
  }
  const data = [
    { value: "", label: "Select an option", disabled: true },
    { value: "IT", label: "IT" },
    { value: "HR", label: "HR" },
    { value: "ACCOUNTING", label: "ACCOUNTING" },
    { value: "MARKETING", label: "MARKETING" },
    { value: "FINANCE", label: "FINANCE" },
    { value: "SALES", label: "SALES" },
    { value: "OTHERS", label: "OTHERS" },
  ];
const DepartmentSelect = (props:Props) => {
    const {value, onChange, ...otherProps} = props

  return (
    <Select
    
    // placeholder="select  department"
    {...otherProps} 
    value={value?.toString()} onChange={it => onChange(it||"")}
    data={data}
  />
  )
}

export default DepartmentSelect