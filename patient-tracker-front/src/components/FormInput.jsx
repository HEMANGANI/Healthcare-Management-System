const FormInput = ({ label, name, type, value, defaultValue, size, onChange }) => {
  // Check if onChange is provided
  const isControlled = onChange !== undefined;
 
 
  return (
    <div className={`form-control ${size?size:""}`}>
      <label htmlFor={name} className='label'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      {isControlled ? (
        <input
          id={name}
          type={type}
          name={name}
          value={value?value:''}
          onChange={onChange}
          className={`input input-bordered`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          defaultValue={defaultValue}
          className={`input input-bordered`}
        />
      )}
    </div>
  );
 };
 
 
 export default FormInput; 