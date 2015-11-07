require 'sinatra'
require 'sinatra/json'
require './db'
require 'fileutils'

#main page
get '/' do
  start_date = Time.now
  end_date = Time.parse "2015-11-08 11:00:00 GMT-0500"
  if (end_date - start_date).to_i >= 0
    cache_control :public, :must_revalidate, max_age:0 
    File.read(File.join('public', 'countdown.html'))
  else 
    File.read(File.join('public', 'homepage.html'))
  end
end

#drop page
post '/drop' do
  drop = Drop.create(name: params["name"], location: params["location"], xcoord: params["xcoord"], ycoord: params["ycoord"])
  drop.save
  redirect to('/')
end

get '/drops' do
  drops = Drop.all
  json :drops => drops
end

#drop reset page
def get_current
  @current = 0
  if File.exist?('current') then
    @current = File.foreach('current').first(1)[0].to_i
  end
  return @current
end
  
def get_password
  File.foreach('password').first(1)[0].strip
end 

post '/drops/reset' do
  halt 403 unless params["password"] == get_password
  FileUtils.mv('current', 'past') if File.exist?('current')
end

#drop next page
post '/drops/next' do
  halt 403 unless params["password"] == get_password
  @current = get_current + 1
  drop = Drop.get(@current)
  File.open('current', 'w') { |file| file.write(@current) } if drop
  json drop
end

#drop current page
get '/drops/current' do
  @current = get_current
  @current = 1 if @current <= 0
  json Drop.get(@current)
end
