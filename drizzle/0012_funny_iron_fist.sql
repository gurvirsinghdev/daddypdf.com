CREATE OR REPLACE FUNCTION public.create_team_for_onboarded_user()
RETURNS trigger AS $$
DECLARE 
  new_team_id uuid;
BEGIN 
  INSERT INTO public.teams (name, plan, created_by)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'first_name') || '''s Team',
    'free',
    NEW.id
  )
  RETURNING id INTO new_team_id;

  INSERT INTO public.team_members (team_id, user_id, role, status)
  VALUES (new_team_id, NEW.id, 'owner', 'joined');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;