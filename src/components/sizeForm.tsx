import React, {useCallback, useMemo, useState} from 'react';
import {useForm} from "react-hook-form";
import sizes from '../sizes.json'
import InputComponent from "./InputComponent";
import {InchToCM} from "../helpers";
import "../styles.css"

type FormData = {
  bust: number;
  waist: number;
  hips: number;
  tradeType: any
}

interface Size {
  id: string
  uk: number
  eu: number
  bust: number
  waist: number
  hips: number
}

export const SizeForm = () => {
  const [searchSize, setSearchSize] = useState<Size | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = useForm<FormData>({
    defaultValues: {
      tradeType: 'cm'
    }
  });

  const tradeType = watch('tradeType')

  const staticScheme = useMemo(() => {
    return Object.values(sizes)
  }, [])

  const isInches = useMemo(() => {
    return tradeType === 'inches'
  }, [tradeType])

  const onSubmit = useCallback(({hips, waist, bust}: FormData) => {
    const mySize = staticScheme.find((mySize: Size, index, array) => {
      let isTrue = true
      if (index + 1 === array.length) return true
      if (array[index + 1].hips <= InchToCM(hips, isInches)) isTrue = false
      if (array[index + 1].waist <= InchToCM(waist, isInches)) isTrue = false
      if (array[index + 1].bust <= InchToCM(bust, isInches)) isTrue = false

      return isTrue
    }) as Size
    setSearchSize(mySize)
  }, [staticScheme, isInches]);

  return (
    <React.Fragment>
      <h1>Find out your size in a few clicks</h1>
      <section >
        <img
          src={'https://alenkaplus.com.ua/wa-data/public/site/img/sizes.jpg'}
          alt="Girl shows where to take measurements"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div  className="radio">
            <input
              type="radio"
              value="cm"
              {...register("tradeType")}
            />
            <label>cm</label>
          </div>
          <div  className="radio">
            <input
              className="radio"
              type="radio"
              value="inches"
              {...register("tradeType")}/>
            <label>inches</label>
          </div>

          {/* cm section */}
          <div>
            <div>
              <InputComponent
                isInches={isInches}
                register={register}
                label={'Bust'}
                errorMessage={errors?.bust?.message}
                name={'bust'}
                min={staticScheme[0].bust}
                max={staticScheme[staticScheme.length - 1].bust}
              />
              <InputComponent
                isInches={isInches}
                register={register}
                label={'Waist'}
                errorMessage={errors?.waist?.message}
                name={'waist'}
                min={staticScheme[0].waist}
                max={staticScheme[staticScheme.length - 1].waist}
              />
              <InputComponent
                isInches={isInches}
                register={register}
                label={'Hips'}
                errorMessage={errors?.hips?.message}
                name={'hips'}
                min={staticScheme[0].hips}
                max={staticScheme[staticScheme.length - 1].hips}
              />

              <button
                type="submit"
                value="Submit"
              >Calculate
              </button>

              {searchSize && <div className="size">
                  <h2>Your size is: {searchSize.id}</h2>
                  <div> UK: {searchSize.uk}</div>
                  <div> EU: {searchSize.eu}</div>
              </div>}
            </div>
          </div>
        </form>
      </section>
    </React.Fragment>
  )
}
