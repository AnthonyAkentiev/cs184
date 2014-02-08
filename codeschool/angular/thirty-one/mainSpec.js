describe('filter',function(){
     beforeEach(module('app'));

     describe('reverse',function(){
          it('should reverse string', inject(function(reverseFilter){
               expect(reverseFilter('ABCD')).toEqual('DCBA');  
          }))
     })
})
