import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchMovieReviews } from "../../services/api"
import { InfinitySpin } from "react-loader-spinner"
import s from './MovieReviews.module.css'

const MovieReviews = () => {
  const {movieId} = useParams()
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    const getReviews = async () => {
      const res = await fetchMovieReviews(movieId)
      setReviews(res)
    }
    getReviews()
  }, [movieId])

  if (!reviews) {
    return (
      <InfinitySpin
        visible={true}
        width="200"
        color="rgb(0, 0, 118)"
        ariaLabel="infinity-spin-loading"
      />
    );
  }
  return (
    <div>
      {
        reviews.map(review => {
          return <div key={review.id} className={s.review}>
            <p className={s.text}>{review.content}</p>
            <p className={s.author}>{review.author}</p>
          </div>
        })
      }
    </div>
  )
}

export default MovieReviews