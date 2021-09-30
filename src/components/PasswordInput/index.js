import './style.scss';
import '../../styles/form.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function PasswordInput({ label, placeholder, register }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex-column input">
      <label>{label}</label>
      <div className="input-password">
        <input
          id="password"
          className="input-password"
          type={showPassword ? 'text' : 'password'}
          label="Senha"
          placeholder={placeholder}
          {...register('senha', { required: true })}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          className="eye-password"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
    </div>
  );
}

export default PasswordInput;
