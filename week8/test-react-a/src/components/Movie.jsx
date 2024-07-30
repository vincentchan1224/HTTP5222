export default function Movie(props) {
  //Each movie should have a prop for:
  //-title
  //-year
  return(
    <p>{props.title} ({props.year})</p>
  )
}