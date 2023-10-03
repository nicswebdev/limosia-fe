export const getPrebookTime = (date)=>{
    const nowDate = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      );
      const midnight = new Date(date);
      midnight.setHours(0, 0, 0, 0);
      const prebook = (midnight - nowDate) / (1000 * 60 * 60);
    //   console.log(prebook)
      return prebook
}