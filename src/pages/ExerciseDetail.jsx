import React, { useCallback, useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import { db } from '../utils/favoriteExercise';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);

  const { id } = useParams();

  const { exercise } = db;
  const favoriteExercise = useLiveQuery(() => exercise.toArray(), []);
  const checkFavorite = favoriteExercise?.find((item) => item.id === id);

  // for api call
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      // const exerciseDbUrl = 'https://zuka.p.rapidapi.com';
      // const youtubeSearchUrl =
      //   'https://youtube-search-and-download.p.rapidapi.com';

      // // fetch for excerciseDetail

      // const exerciseDetailData = await fetchData(
      //   `${exerciseDbUrl}/exercices/id/${id}`,
      //   exerciseOptions
      // );
      // setExerciseDetail(exerciseDetailData.exercice);

      // // fetch for excerciseVideoYt
      // const [firstItem] = exerciseDetailData.exercice;

      // const exerciseVideosData = await fetchData(
      //   `${youtubeSearchUrl}/search?query=${firstItem.name} exercise`,
      //   youtubeOptions
      // );
      // setExerciseVideos(exerciseVideosData.contents);

      // // fetch for similarExcercise

      // const targetMuscleExercisesData = await fetchData(
      //   `${exerciseDbUrl}/exercices/muscle/${firstItem.target}`,
      //   exerciseOptions
      // );

      // setTargetMuscleExercises(targetMuscleExercisesData.exercice);

      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl =
        'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      setTargetMuscleExercises(targetMuscleExercisesData);
    };

    fetchExercisesData();
  }, [id]);

  const addFavorite = async (data) => {
    // const { name, gifUrl, bodyPart, target, equipment } = data[0];
    const { name, gifUrl, bodyPart, target, equipment } = data;
    await exercise.add({
      id,
      name,
      gifUrl,
      bodyPart,
      target,
      equipment,
    });
  };

  const deleteFavorite = async () => {
    exercise.delete(id);
  };

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box
      sx={{ mt: { lg: '96px', xs: '60px' }, ml: { md: '100px' } }}
      minHeight='560px'
      height='auto'
    >
      {checkFavorite ? (
        <div
          aria-label='favorite this exercise'
          className='like'
          onClick={deleteFavorite}
        >
          <span>❤️</span>
        </div>
      ) : (
        <div
          aria-label='unfavorite this exercise'
          className='like'
          onClick={() => addFavorite(exerciseDetail)}
        >
          <span>♡</span>
        </div>
      )}

      {/* {exerciseDetail?.map((item) => (
        <Detail exerciseDetail={item} key={item.name} />
      ))} */}
      <Detail exerciseDetail={exerciseDetail} />

      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} />
    </Box>
  );
};

export default ExerciseDetail;
