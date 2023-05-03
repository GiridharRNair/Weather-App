import React from 'react'

function Forecast({ daysOfTheWeek, data }) {
  return (
    <div className="bg-slate-600 py-3 flex flex-row md:space-x-14 space-x-5 bg-opacity-70 rounded-xl w-auto+ h-36 justify-center">
    <div class="text-center flex flex-col">
      Sun
      <div>
        54*f
      </div>
    </div>
    <div class="text-center">Mon</div>
    <div class="text-center">Tue</div>
    <div class="text-center">Wed</div>
    <div class="text-center">Thu</div>
    <div class="text-center">Fri</div>
    <div class="text-center">Sat</div>
  </div>
  )
}

export default Forecast