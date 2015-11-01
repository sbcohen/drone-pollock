require 'sinatra'
require 'data_mapper'

DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/dronedata.db")

class Drop
  include DataMapper::Resource
  property :id, Serial
  property :name, String, :required => true
  property :location, String, :required => true
  property :xcoord, Float, :min => 0, :max => 100, :required => true
  property :ycoord, Float, :min => 0, :max => 100, :required => true
  property :created_at, DateTime
end
DataMapper.finalize