import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import hiphop from '../assets/images/hiphop.jpg';
import pop from '../assets/images/pop.jpg';
import country from '../assets/images/country.jpg';

export default function Playlist2() {
  return (
    <div className="flex">
    <h1>Your Daily Mix</h1>
    <Card className="bg-gray-500 py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-white uppercase font-bold">Hip Hop Mix</p>
        <small className="text-white">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={hiphop}
          width={270}
        />
      </CardBody>
    </Card>
    <Card className="bg-gray-500 py-4 ml-6">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-white uppercase font-bold">Pop Mix</p>
          <small className="text-white">14 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={pop}
            width={270}
          />
        </CardBody>
      </Card>
      <Card className="bg-gray-500 py-4 ml-6">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-white uppercase font-bold">Country Mix</p>
          <small className="text-white">3 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={country}
            width={270}
          />
        </CardBody>
      </Card>


    </div>
  );
}