package visualization.web.resources;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import visualization.web.resources.geoJSON.LineString;

import java.util.List;

/*
Representation of a Ride
 */

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude
public class RideResource {

    @JsonProperty
    private int rideId;

    @JsonProperty
    private LineString ride;

}