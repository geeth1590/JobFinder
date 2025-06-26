package org.example.backend.Repository;


import org.example.backend.DTO.EventJobRequestDto;
import org.example.backend.Model.Event;
import org.example.backend.Utils.CommonResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    @Query(value = """
     select e.event_id,v.title,v.image_url,u.username
     from jobfinder.jobrequest as e 
        inner join jobfinder.users as u on e.user_id = u.id
      inner join jobfinder.event as v on v.id = e.event_id
      WHERE (:userId IS NULL OR u.id = :userId)
      
    """, nativeQuery = true)
    List<Object[]> findEventsByUserAndEvent(@Param("userId") Long userId);

    @Query(value = """
     select e.event_id,v.title,v.image_url,u.username
     from jobfinder.jobrequest as e 
        inner join jobfinder.users as u on e.user_id = u.id
      inner join jobfinder.event as v on v.id = e.event_id
  """, nativeQuery = true)
    List<Object[]> findAllEvents();


    @Query(value = """
     SELECT count(id) FROM jobfinder.event
      WHERE (:userId IS NULL OR uplodet_by = :userId)
  """, nativeQuery = true)
    List<Object[]>  getCountAll(Long userId);

    @Query(value = """
     SELECT count(id) FROM jobfinder.jobrequest
      WHERE (:userId IS NULL OR user_id = :userId)
  """, nativeQuery = true)
    List<Object[]> getJobRequestCount(Long userId);

    @Query(value = """
     SELECT count(id) FROM jobfinder.jobrequest
      WHERE (:userId IS NULL OR user_id = :userId)
     AND  job_status=1
  """, nativeQuery = true)
    List<Object[]> getApproedCount(Long userId);
}
