import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);

  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://zuka.p.rapidapi.com';
      const youtubeSearchUrl =
        'https://youtube-search-and-download.p.rapidapi.com';

      // fetch for excerciseDetail

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercices/id/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData.exercice);

      // fetch for excerciseVideoYt
      const [firstItem] = exerciseDetailData.exercice;

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${firstItem.name} exercise`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);

      // fetch for similarExcercise

      const targetMuscleExercisesData = await fetchData(
        `${exerciseDbUrl}/exercices/muscle/${firstItem.target}`,
        exerciseOptions
      );
      console.log(targetMuscleExercisesData.exercice);
      setTargetMuscleExercises(targetMuscleExercisesData.exercice);
    };

    fetchExercisesData();
  }, [id]);

  const handleFavorite = () => {
    setIsLiked(!isLiked);
  };

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' }, ml: { md: '100px' } }}>
      <button
        aria-label='unlike this restaurant'
        id='likeButton'
        className='like'
        type='button'
        onClick={handleFavorite}
      >
        {isLiked ? '❤️' : ''}
      </button>
      {exerciseDetail.map((item) => (
        <Detail exerciseDetail={item} />
      ))}

      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} />
    </Box>
  );
};

export default ExerciseDetail;
