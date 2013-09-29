#import <Foundation/Foundation.h>
#import "Photo.h"

@interface User : NSObject <NSCoding>

@property (strong, nonatomic) NSString *firstName;
@property (strong, nonatomic) NSString *lastName;
@property (strong, nonatomic) NSString *city;
@property (strong, nonatomic) Photo *profilePhoto;
@property (strong, nonatomic) NSString *biography;
@property (strong, nonatomic) NSString *memberSince;
@property (strong, nonatomic) NSString *location;

-(id)initWithJSON;

@end

/////////
#import "User.h"
#import "AFJSONRequestOperation.h"
#import "Photo.h"

@implementation User

- (id)init
{
     self = [self initWithJSON];
     return self;
}

- (id)initWithJSON
{
     self = [super init];
     if(self) {        
          NSURL *url = [[NSURL alloc] initWithString:@"http://operation-models.codeschool.com/userProfile.json"];
          NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];

          AFJSONRequestOperation *operation = [AFJSONRequestOperation JSONRequestOperationWithRequest:request success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON) {
               self.firstName = JSON[@"firstName"];
               self.lastName = JSON[@"lastName"];
               self.city = JSON[@"city"];
               self.profilePhoto = [[Photo alloc] initWithTitle:@"Profile Photo"
                    detail:@"detail"
                    filename:JSON[@"profilePhoto"]
                    thumbnail:JSON[@"profilePhotoThumbnail"]];
               self.biography = JSON[@"biography"];
               self.memberSince = JSON[@"memberSince"];

               self.location = @"no location yet";

               [[NSNotificationCenter defaultCenter] postNotificationName:@"initWithJSONFinishedLoading" object:nil];
          } failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error, id JSON) {
               NSLog(@"NSError: %@",[error localizedDescription]);
          }];

          [operation start];

     }
     return self;
}

-(void)encodeWithCoder:(NSCoder *)anEncoder 
{
     [anEncoder encodeObject:self.firstName forKey:@"firstName"];
     [anEncoder encodeObject:self.lastName forKey:@"lastName"];
     [anEncoder encodeObject:self.city forKey:@"city"];
     [anEncoder encodeObject:self.profilePhoto forKey:@"profilePhoto"];
     [anEncoder encodeObject:self.biography forKey:@"biography"];
     [anEncoder encodeObject:self.memberSince forKey:@"memberSince"];
     [anEncoder encodeObject:self.location forKey:@"location"];
}

-(id)initWithCoder:(NSCoder *)aDecoder {
     self = [super init];
     if(self) {
          self.firstName = [aDecoder decodeObjectForKey:@"firstName"];
          self.lastName  = [aDecoder decodeObjectForKey:@"lastName"];
          self.city      = [aDecoder decodeObjectForKey:@"city"];
          self.profilePhoto = [aDecoder decodeObjectForKey:@"profilePhoto"];
          self.memberSince  = [aDecoder decodeObjectForKey:@"memberSince"];
          self.biography = [aDecoder decodeObjectForKey:@"biography"];
          self.location  = [aDecoder decodeObjectForKey:@"location"];
     }
     return self;
}


@end
