import React, { useState, useEffect } from 'react';
import './credits.scss';

const FETCH_PATRONS_URL = `https://api.alexbainter.com/v1/active-patrons`;
const CACHE_TIME_KEY = 'cache_time';
const CACHE_VALUE_KEY = 'cache_value';

const fetchPatrons = () => {
  const now = Date.now();
  const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
  const cachedValue = localStorage.getItem(CACHE_VALUE_KEY);
  if (cacheTime) {
    const parsedCacheTime = Number.parseInt(cacheTime, 10);
    if (now - parsedCacheTime < 60 * 60 * 1000) {
      try {
        const value = JSON.parse(cachedValue);
        return Promise.resolve(value);
      } catch (e) {
        // do nothing
      }
    }
  }
  return fetch(FETCH_PATRONS_URL)
    .then(response => response.json())
    .then(patronList => {
      localStorage.setItem(CACHE_TIME_KEY, now);
      localStorage.setItem(CACHE_VALUE_KEY, JSON.stringify(patronList));
      return patronList;
    });
};

const Credits = () => {
  const [majorSupporters, setMajorSupporters] = useState([]);
  const [supporters, setSupporters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPatrons()
      .then(patronList => {
        setIsLoading(false);
        const sortedPatrons = patronList.sort(
          (a, b) => b.creditScore - a.creditScore
        );
        setMajorSupporters(
          sortedPatrons
            .filter(({ creditScore }) => creditScore >= 20)
            .map(({ name }) => name)
        );
        setSupporters(
          sortedPatrons
            .filter(({ creditScore }) => creditScore < 20)
            .map(({ name }) => name)
        );
      })
      .catch(error => {
        //eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  return (
    <div className="credits">
      Thank you to the incredible Patrons who keep this project going:
      {isLoading && (
        <div>
          <i>Loading Patron list...</i>
        </div>
      )}
      <div className="credits__supporters">
        {majorSupporters.map(name => (
          <div key={name} className="credits__name credits__name--major">
            {name}
          </div>
        ))}
      </div>
      <div className="credits__supporters">
        {supporters.map(name => (
          <div key={name} className="credits__name">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
