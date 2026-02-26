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

  INSERT INTO public.team_members (team_id, user_id, role)
  VALUES (new_team_id, NEW.id, 'owner');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_team_for_onboarded_user(); 