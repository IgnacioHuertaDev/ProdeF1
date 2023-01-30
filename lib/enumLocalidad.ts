async function enumLocalidad(provinciaId: number, descripcion?: string) {
  let myHeaders = new Headers()
  myHeaders.append('ImpersonateUser', 'admin')
  myHeaders.append(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVc3VhcmlvIiwiZW1haWwiOiJub3JlcGx5QGVtbXNhLm5ldCIsImh0dHA6Ly9zY2hlbWFzLmVtbXNhLm5ldC9pZGVudGl0eS9jbGFpbXMvc3lzdGVtIjo1LCJodHRwOi8vc2NoZW1hcy5lbW1zYS5uZXQvaWRlbnRpdHkvY2xhaW1zL3VzZXIiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLmVtbXNhLm5ldC9pZGVudGl0eS9jbGFpbXMvc2Vzc2lvbiI6NjI2ODksImh0dHA6Ly9zY2hlbWFzLmVtbXNhLm5ldC9pZGVudGl0eS9jbGFpbXMvd2Vic2l0ZSI6Imh0dHA6Ly9pbnN1cmFuY2Utc2luaWVzdHJvcy8iLCJodHRwOi8vc2NoZW1hcy5lbW1zYS5uZXQvaWRlbnRpdHkvY2xhaW1zL2lzYWRtaW5pc3RyYXRvciI6dHJ1ZSwiaHR0cDovL3NjaGVtYXMuZW1tc2EubmV0L2lkZW50aXR5L2NsYWltcy9hdXRoZW50aWNhdGlvbmluc3RhbnQiOiIyMDIwLTEwLTI5IDA0OjIxOjE4WiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6IlVzdWFyaW8iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImV4cCI6MTYwMzk0NzA3NywiaXNzIjoiQWRJbnN1cmFuY2UuU2luaWVzdHJvcyIsImF1ZCI6IkFkSW5zdXJhbmNlLlNpbmllc3Ryb3MifQ.c5bIhrNSz7SyuwvAlf4Ubfuo036l_uC7c93RuwIzP-A'
  )
  myHeaders.append('Content-Type', 'application/xml')

  let body = null

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  }

  const response = await fetch(
    'http://emmsa-adinsurance/siniestros/api/config/EnumLocalidad',
    requestOptions
  )

  return response
}
export default enumLocalidad
