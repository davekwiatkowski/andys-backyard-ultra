import { FC } from 'react';
import image from './assets/andys-field.jpg';

const App: FC = () => {
  return (
    <div className='min-h-screen p-8 font-serif h-fit bg-rose-50 xl:p-14'>
      <div className='flex flex-row flex-wrap max-w-full gap-4'>
        <img src={image} width={500} alt='Field with tents at the event' />
        <div className='max-w-lg pt-8 pb-8 pl-4 border-l border-rose-200 xl:max-w-2xl'>
          <h1 className='mb-4 text-6xl font-extralight'>
            Andy's Backyard Ultra
          </h1>
          <p className='italic'>
            Run a 4.167 mile loop every hour on the hour around a trail in
            Earlysville, VA on October 15th.
          </p>
          <hr className='mt-2 mb-2 border-rose-200' />
          <p className='pb-2'>
            Do you have what it takes to be the last one standing? Come join us
            and find your limit in Andy's Backyard!
          </p>
          <div className='mb-4'>
            <a
              className='p-2 border border-black hover:bg-black hover:text-white'
              href='https://runsignup.com/Race/Register/?raceId=105772&eventId=573540'
              target='_blank'
              rel='noopener noreferrer'>
              Register 🏃‍♀️
            </a>
          </div>
          <hr className='mt-2 mb-2 border-rose-200' />
          <div className='mb-2'>
            <label className='mr-2 font-bold'>Location:</label>
            <span>5422 Markwood Road, Earlysville, VA, 22936</span>
          </div>
          <div className='mb-2'>
            <label className='mr-2 font-bold'>Date:</label>
            <span>{new Date('10/15/2022').toDateString()}</span>
          </div>
          <hr className='mt-2 mb-2 border-rose-200' />
          <p className='mb-2'>
            Keep up with us on social media!{' '}
            <span className='font-mono font-bold'>@andysbyu 🐶</span>
          </p>
          <div className='flex flex-row gap-4 mb-4'>
            <a
              href='https://www.facebook.com/andysbyu'
              target='_blank'
              rel='noopener noreferrer'
              className='pt-1 pb-1 pl-2 pr-2 underline border border-black hover:bg-black hover:text-white'>
              Facebook
            </a>
            <a
              href='https://www.instagram.com/andysbyu'
              target='_blank'
              rel='noopener noreferrer'
              className='pt-1 pb-1 pl-2 pr-2 underline border border-black hover:bg-black hover:text-white'>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
