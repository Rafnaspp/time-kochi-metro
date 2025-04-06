// Kochi Metro stations data
export const kochiMetroStations = [
    { id: "aluva", name: "Aluva" },
    { id: "pulinchodu", name: "Pulinchodu" },
    { id: "companypady", name: "Companypady" },
    { id: "ambattukavu", name: "Ambattukavu" },
    { id: "muttom", name: "Muttom" },
    { id: "kalamassery", name: "Kalamassery" },
    { id: "cochin-university", name: "Cochin University" },
    { id: "pathadipalam", name: "Pathadipalam" },
    { id: "edapally", name: "Edapally" },
    { id: "changampuzha", name: "Changampuzha Park" },
    { id: "palarivattom", name: "Palarivattom" },
    { id: "jln-stadium", name: "JLN Stadium" },
    { id: "kaloor", name: "Kaloor" },
    { id: "lissie", name: "Lissie" },
    { id: "mg-road", name: "MG Road" },
    { id: "maharajas", name: "Maharaja's College" },
    { id: "ernakulam-south", name: "Ernakulam South" },
    { id: "kadavanthra", name: "Kadavanthra" },
    { id: "elamkulam", name: "Elamkulam" },
    { id: "vyttila", name: "Vyttila" },
    { id: "thaikoodam", name: "Thaikoodam" },
    { id: "petta", name: "Petta" },
  ]
  
  /**
   * Calculate travel time between stations
   * @param stationCount Number of stations between origin and destination
   * @returns Travel time in minutes
   */
  export function calculateTravelTime(stationCount: number): number {
    // Average time between stations is about 2-3 minutes
    // Add 30 seconds for each station stop
    const travelTime = stationCount * 2.5
    const stationStopTime = stationCount * 0.5
  
    // Round to nearest minute
    return Math.round(travelTime + stationStopTime)
  }
  
  /**
   * Calculate fare between stations
   * @param stationCount Number of stations between origin and destination
   * @returns Fare in rupees
   */
  export function calculateFare(stationCount: number): number {
    // Simplified fare calculation based on Kochi Metro's fare structure
    if (stationCount <= 2) return 10
    if (stationCount <= 4) return 20
    if (stationCount <= 6) return 30
    if (stationCount <= 8) return 40
    if (stationCount <= 10) return 50
    if (stationCount <= 14) return 60
    return 70 // Maximum fare
  }
  
  