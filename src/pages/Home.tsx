import React from 'react';

interface props {
  display_name: string;
}

export default function Home({ display_name }: props) {
  return <div>Welcome {display_name}</div>;
}
