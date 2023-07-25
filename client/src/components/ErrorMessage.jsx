import ErrorIcon from '@mui/icons-material/Error'

const ErrorMessage = (props) => {
    return (
      <div className="text-red-600 font-bold flex items-center justify-end gap-2" key={props.err.name}>
        <ErrorIcon />{props.err.message}
      </div>
    )
}

export default ErrorMessage