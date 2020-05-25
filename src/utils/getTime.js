function getTime(time,self){
  return self.$moment(new Date(time)).format('YYYY-MM-DD')
}
export default getTime