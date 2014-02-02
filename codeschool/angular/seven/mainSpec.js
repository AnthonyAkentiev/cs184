describe('filter',function(){
     beforeEach(module('myApp'));

     describe('reverse',function(){
          it('should reverse string', inject(function(reverseFilter){
               expect(reverseFilter('ABCD')).toEqual('DCBA');  
          }))
     })
})
